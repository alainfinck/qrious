#!/usr/bin/env bash
# Orchestrateur Expo / iOS / web pour mobile/
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOBILE_DIR="$ROOT_DIR/mobile"
DEFAULT_SIMULATOR="${MOBILE_SIMULATOR:-iPhone 17}"
DEFAULT_API_URL="${EXPO_PUBLIC_API_URL:-http://localhost:3000}"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

setup_node() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  [ -s "$HOME/.fnm/fnm" ] && eval "$("$HOME/.fnm/fnm" env)"
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

  if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js introuvable (Node 22 requis)."
    exit 1
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
    corepack prepare pnpm@latest --activate >/dev/null 2>&1 || true
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    echo "❌ pnpm introuvable. Activez-le avec : corepack enable && corepack prepare pnpm@latest --activate"
    exit 1
  fi
}

load_mobile_env() {
  if [[ -f "$MOBILE_DIR/.env" ]]; then
    set -a
    # shellcheck disable=SC1091
    source "$MOBILE_DIR/.env"
    set +a
  fi
}

cd_mobile() {
  if [[ ! -d "$MOBILE_DIR" ]]; then
    echo "❌ Dossier mobile introuvable: $MOBILE_DIR"
    exit 1
  fi
  cd "$MOBILE_DIR"
  load_mobile_env
  if [[ ! -d node_modules ]]; then
    echo "📦 Installation des dépendances mobile…"
    pnpm install
  fi
}

find_app_binary() {
  local app
  app="$(ls -dt "$HOME"/Library/Developer/Xcode/DerivedData/*/Build/Products/Debug-iphonesimulator/*.app 2>/dev/null | head -1 || true)"
  if [[ -z "$app" || ! -d "$app" ]]; then
    return 1
  fi
  printf '%s' "$app"
}

find_workspace() {
  local ws
  ws="$(ls -d "$MOBILE_DIR"/ios/*.xcworkspace 2>/dev/null | grep -v '\.xcodeproj/' | head -1 || true)"
  if [[ -z "$ws" ]]; then
    return 1
  fi
  printf '%s' "$ws"
}

find_xcode_project() {
  local ws proj
  if ws="$(find_workspace)"; then
    printf '%s' "$ws"
    return 0
  fi
  proj="$(ls -d "$MOBILE_DIR"/ios/*.xcodeproj 2>/dev/null | head -1 || true)"
  if [[ -n "$proj" ]]; then
    printf '%s' "$proj"
    return 0
  fi
  return 1
}

bundle_id_from_app() {
  local app="$1"
  /usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$app/Info.plist" 2>/dev/null || true
}

list_physical_iphones() {
  # Sortie: "Nom|UDID|online|offline" — Devices + Devices Offline (hors Mac / simulateurs)
  xcrun xctrace list devices 2>/dev/null | awk '
    BEGIN { section = "" }
    /^== Devices Offline ==/ { section = "offline"; next }
    /^== Devices ==/ { section = "online"; next }
    /^== Simulators ==/ { exit }
    section == "" { next }
    /^MacBook / { next }
    /^[[:space:]]*$/ { next }
    {
      line = $0
      n = split(line, parts, /[()]/)
      udid = ""
      for (i = 1; i <= n; i++) {
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", parts[i])
        if (parts[i] ~ /^[0-9A-Fa-f]{8}-[0-9A-Fa-f-]{10,}$/) udid = parts[i]
      }
      if (udid == "") next
      name = line
      sub(/[[:space:]]*\([^)]*\)[[:space:]]*\([^)]*\)[[:space:]]*$/, "", name)
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", name)
      if (name != "") print name "|" udid "|" section
    }
  '
}

device_status_hint() {
  cat <<'EOF'
   Déverrouille l’iPhone et laisse l’écran allumé pendant le build.
   Puis :
     1. Câble USB bien branché, « Faire confiance à cet ordinateur »
     2. Mode Développeur ON (Réglages → Confidentialité et sécurité)
     3. Si ça bloque encore : débranche / rebranche, ou ouvre Xcode une fois
        (./mobile.sh xcode) et sélectionne l’iPhone comme destination
EOF
}

wait_for_device_ready() {
  local udid="$1"
  local name="$2"
  local tries=24
  local i line status

  echo "🔎 Vérification que « $name » est prêt…"
  for ((i = 1; i <= tries; i++)); do
    line="$(list_physical_iphones | awk -F'|' -v id="$udid" '$2 == id { print; exit }')"
    status="${line##*|}"
    if [[ "$status" == "online" ]]; then
      echo "✅ iPhone prêt ($udid)"
      return 0
    fi
    if [[ $i -eq 1 ]]; then
      echo "⏳ iPhone détecté mais pas encore prêt (souvent verrouillé / Offline)…"
      device_status_hint
      echo "   En attente (déverrouille l’iPhone maintenant)…"
    fi
    sleep 2
  done
  return 1
}

pick_physical_device() {
  local want="${1:-${MOBILE_DEVICE:-}}"
  local lines online offline line name udid status count idx choice selected

  lines="$(list_physical_iphones || true)"
  online="$(printf '%s\n' "$lines" | awk -F'|' '$3 == "online"' || true)"
  offline="$(printf '%s\n' "$lines" | awk -F'|' '$3 == "offline"' || true)"

  # Préférer les appareils online pour le matching / auto-pick
  if [[ -n "$want" ]]; then
    for status in online offline; do
      local pool
      if [[ "$status" == "online" ]]; then
        pool="$online"
      else
        pool="$offline"
      fi
      while IFS= read -r line; do
        [[ -z "$line" ]] && continue
        name="${line%%|*}"
        udid="$(printf '%s' "$line" | cut -d'|' -f2)"
        if [[ "$want" == "$name" || "$want" == "$udid" || "$name" == *"$want"* ]]; then
          printf '%s|%s|%s' "$name" "$udid" "$status"
          return 0
        fi
      done <<< "$pool"
    done
    printf '%s||' "$want"
    return 0
  fi

  if [[ -n "$online" ]]; then
    selected="$online"
  elif [[ -n "$offline" ]]; then
    selected="$offline"
  else
    return 1
  fi

  count="$(printf '%s\n' "$selected" | grep -c . || true)"
  if [[ "$count" -eq 1 ]]; then
    line="$(printf '%s\n' "$selected" | head -1)"
    name="${line%%|*}"
    udid="$(printf '%s' "$line" | cut -d'|' -f2)"
    status="$(printf '%s' "$line" | cut -d'|' -f3)"
    printf '%s|%s|%s' "$name" "$udid" "$status"
    return 0
  fi

  echo "📱 Plusieurs iPhones détectés :" >&2
  idx=1
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    name="${line%%|*}"
    udid="$(printf '%s' "$line" | cut -d'|' -f2)"
    status="$(printf '%s' "$line" | cut -d'|' -f3)"
    echo "  $idx) $name  ($udid) [$status]" >&2
    idx=$((idx + 1))
  done <<< "$selected"
  printf "Choix [1]: " >&2
  read -r choice || true
  choice="${choice:-1}"
  if ! [[ "$choice" =~ ^[0-9]+$ ]] || [[ "$choice" -lt 1 || "$choice" -gt "$count" ]]; then
    echo "❌ Choix invalide." >&2
    return 1
  fi
  line="$(printf '%s\n' "$selected" | sed -n "${choice}p")"
  name="${line%%|*}"
  udid="$(printf '%s' "$line" | cut -d'|' -f2)"
  status="$(printf '%s' "$line" | cut -d'|' -f3)"
  printf '%s|%s|%s' "$name" "$udid" "$status"
  return 0
}

usage() {
  cat <<EOF
Usage: ./mobile.sh <commande> [options]

Orchestrateur pour l'app Expo (mobile/).

iPhone / Xcode:
  xcode | open           Ouvre le projet iOS dans Xcode (.xcworkspace)
  native [nom|udid]      App standalone (Release) sur iPhone — PAS besoin de Metro
  release | standalone   Alias de native
  iphone [nom|udid]      Dev Client (Debug) sur iPhone — nécessite Metro ensuite
  device | phone         Alias de iphone
  devices                Liste les iPhones/iPads branchés / connus
  eas:preview            Build EAS interne (installable)
  eas:production         Build EAS production (App Store / submit)

Simulateur & Metro:
  ios [simulateur]       Compile et lance sur simulateur — défaut: "${DEFAULT_SIMULATOR}"
  run [simulateur]       Alias de ios
  sim [simulateur]       Réinstalle le dernier build + Metro (sans recompiler)
  last [simulateur]      Alias de sim
  start [--clear]        Démarre Metro / Expo

Projet natif:
  prebuild [--clean]     Régénère ios/ (expo prebuild)
  rebuild [--clean]      Alias de prebuild
  pods                   Relance pod install dans ios/
  clean                  Nettoie DerivedData + ios/
  doctor                 expo-doctor
  all [--clean]          prebuild puis ios sur simulateur

Web & backend:
  web                    Lance Expo web (Metro, baseUrl=/newqr)
  newqr | editeur        Export static → public/newqr (URL /newqr via Next)
  site                   Lance le backend Next.js (./runsh.sh)

Options:
  -h, -H, --help         Aide
  --simulator NOM        Force le simulateur (ios / sim / all)

Exemples:
  ./mobile.sh start               # Metro / Expo Go
  ./mobile.sh web                 # Dashboard web Expo → http://localhost:8081/newqr
  ./mobile.sh newqr               # génère /newqr puis ouvrir via ./runsh.sh
  ./mobile.sh native              # app comme une vraie app (recommandé)
  ./mobile.sh iphone              # mode dev + Metro
  ./mobile.sh xcode
  ./mobile.sh devices
  ./mobile.sh site                # backend API sur :3000

Avant install iPhone :
  1. USB, déverrouillé, « Faire confiance à cet ordinateur »
  2. Mode Développeur ON
  3. Signing OK une fois : ./mobile.sh xcode

Variables:
  MOBILE_SIMULATOR       Simulateur par défaut (actuel: ${DEFAULT_SIMULATOR})
  MOBILE_DEVICE          iPhone physique par défaut (nom ou UDID)
  EXPO_PUBLIC_API_URL    API backend (défaut: ${DEFAULT_API_URL})
EOF
}

# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

cmd_prebuild() {
  local clean=0
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --clean) clean=1; shift ;;
      *) echo "Option inconnue pour prebuild: $1"; usage; exit 1 ;;
    esac
  done

  cd_mobile
  echo "🧱 expo prebuild --platform ios${clean:+ --clean}…"
  if [[ $clean -eq 1 ]]; then
    pnpm exec expo prebuild --platform ios --clean
  else
    pnpm exec expo prebuild --platform ios
  fi
  echo "✅ Projet iOS régénéré dans $MOBILE_DIR/ios"
}

cmd_ios() {
  local sim="$DEFAULT_SIMULATOR"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --simulator)
        sim="${2:-}"
        [[ -n "$sim" ]] || { echo "❌ --simulator requiert un nom"; exit 1; }
        shift 2
        ;;
      -*)
        echo "Option inconnue pour ios: $1"; usage; exit 1
        ;;
      *)
        sim="$1"
        shift
        ;;
    esac
  done

  cd_mobile
  echo "📱 expo run:ios — simulateur: $sim"
  pnpm exec expo run:ios --device "$sim"
}

cmd_devices() {
  echo "📱 Appareils physiques connus de Xcode:"
  local lines name udid status
  lines="$(list_physical_iphones || true)"
  if [[ -z "$lines" ]]; then
    echo "  (aucun — branche l'iPhone en USB, déverrouille-le, accepte « Faire confiance »)"
    echo "  Astuce: Mode Développeur activé (Réglages → Confidentialité et sécurité)"
    return 0
  fi
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    name="${line%%|*}"
    udid="$(printf '%s' "$line" | cut -d'|' -f2)"
    status="$(printf '%s' "$line" | cut -d'|' -f3)"
    echo "  • $name  ($udid) [$status]"
  done <<< "$lines"
  echo ""
  echo "Pour une vraie app (sans Metro) : ./mobile.sh native"
  echo "Pour le mode dev              : ./mobile.sh iphone"
  echo "(l'iPhone doit être [online] = déverrouillé, écran allumé)"
}

resolve_physical_target() {
  # Sortie stdout: "name|udid|target"  — target = udid ou name pour expo --device
  local pick name udid status target
  if [[ ! -d "$MOBILE_DIR/ios" ]]; then
    echo "🧱 Projet iOS absent — prebuild…" >&2
    cmd_prebuild
  fi

  if ! pick="$(pick_physical_device "${1:-}")"; then
    echo "❌ Aucun iPhone physique détecté." >&2
    device_status_hint >&2
    echo "   Liste : ./mobile.sh devices" >&2
    return 1
  fi

  name="$(printf '%s' "$pick" | cut -d'|' -f1)"
  udid="$(printf '%s' "$pick" | cut -d'|' -f2)"
  status="$(printf '%s' "$pick" | cut -d'|' -f3)"
  if [[ -n "$udid" ]]; then
    target="$udid"
    echo "📱 Cible: $name ($udid)" >&2
  else
    target="$name"
    echo "📱 Cible: $target" >&2
  fi

  if [[ -n "$udid" ]]; then
    if [[ "$status" != "online" ]]; then
      if ! wait_for_device_ready "$udid" "$name"; then
        echo "❌ Timeout: l’iPhone n’est pas passé [online]." >&2
        echo "   Erreur Xcode typique: « may need to be unlocked to recover from preparation errors »" >&2
        device_status_hint >&2
        return 1
      fi
    else
      echo "✅ iPhone déjà prêt" >&2
    fi
  fi

  printf '%s|%s|%s' "$name" "$udid" "$target"
}

cmd_device() {
  local resolved name udid target
  if ! resolved="$(resolve_physical_target "${1:-}")"; then
    exit 1
  fi
  name="$(printf '%s' "$resolved" | cut -d'|' -f1)"
  udid="$(printf '%s' "$resolved" | cut -d'|' -f2)"
  target="$(printf '%s' "$resolved" | cut -d'|' -f3)"

  cd_mobile
  echo "⏳ Build Debug + install — laisse l’iPhone déverrouillé…"
  if ! pnpm exec expo run:ios --device "$target"; then
    echo ""
    echo "❌ Build / install échoué."
    echo "   Si tu vois « Timed out waiting for destinations » ou « need to be unlocked » :"
    device_status_hint
    exit 1
  fi

  echo ""
  echo "✅ App installée sur « $name »."
  echo "   Mode développement : il faut Metro pour charger le JS."
  print_dev_client_connect_help
  echo "🚇 Relance Metro maintenant (Ctrl+C pour arrêter)…"
  cmd_start
}

cmd_native() {
  local resolved name target
  if ! resolved="$(resolve_physical_target "${1:-}")"; then
    exit 1
  fi
  name="$(printf '%s' "$resolved" | cut -d'|' -f1)"
  target="$(printf '%s' "$resolved" | cut -d'|' -f3)"

  cd_mobile
  echo "🚀 Build Release (app standalone) → $name"
  echo "   Le JS est embarqué : pas besoin de Metro."
  echo "⏳ Compilation (plus longue la 1ʳᵉ fois) — laisse l’iPhone déverrouillé…"
  if ! pnpm exec expo run:ios --configuration Release --device "$target"; then
    echo ""
    echo "❌ Build Release échoué."
    device_status_hint
    exit 1
  fi

  echo ""
  echo "✅ App native installée sur « $name »."
  echo "   Ouvre QRious sur l’iPhone : elle démarre seule, sans Metro."
}

cmd_eas_preview() {
  cd_mobile
  if [[ ! -f eas.json ]]; then
    echo "❌ eas.json introuvable dans mobile/. Configure EAS d’abord (eas init)."
    exit 1
  fi
  echo "☁️  EAS build preview (distribution interne)…"
  pnpm exec eas build --platform ios --profile preview
}

cmd_eas_production() {
  cd_mobile
  if [[ ! -f eas.json ]]; then
    echo "❌ eas.json introuvable dans mobile/. Configure EAS d’abord (eas init)."
    exit 1
  fi
  echo "☁️  EAS build production…"
  pnpm exec eas build --platform ios --profile production
}

cmd_sim() {
  local sim="$DEFAULT_SIMULATOR"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --simulator)
        sim="${2:-}"
        [[ -n "$sim" ]] || { echo "❌ --simulator requiert un nom"; exit 1; }
        shift 2
        ;;
      -*)
        echo "Option inconnue pour sim: $1"; usage; exit 1
        ;;
      *)
        sim="$1"
        shift
        ;;
    esac
  done

  local app
  if ! app="$(find_app_binary)"; then
    echo "❌ Aucun build simulateur trouvé dans DerivedData."
    echo "   Lance d'abord : ./mobile.sh ios"
    exit 1
  fi

  local bundle_id
  bundle_id="$(bundle_id_from_app "$app")"
  echo "📦 Dernier build: $app"
  [[ -n "$bundle_id" ]] && echo "🆔 Bundle ID: $bundle_id"

  echo "📲 Boot simulateur: $sim"
  xcrun simctl boot "$sim" 2>/dev/null || true
  open -a Simulator

  echo "📥 Installation…"
  xcrun simctl install booted "$app"

  cd_mobile
  echo "🚇 Démarrage Metro…"
  pnpm exec expo start &
  local metro_pid=$!
  sleep 4

  local lan_ip
  lan_ip="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo localhost)"
  local scheme="exp+qrious"
  if [[ -n "$bundle_id" ]]; then
    xcrun simctl launch booted "$bundle_id" 2>/dev/null || true
  fi
  xcrun simctl openurl booted "${scheme}://expo-development-client/?url=http%3A%2F%2F${lan_ip}%3A8081" 2>/dev/null || true

  wait "$metro_pid"
}

lan_ip() {
  ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo ""
}

print_dev_client_connect_help() {
  local ip
  ip="$(lan_ip)"
  echo ""
  echo "📲 Sur l’iPhone :"
  if [[ -n "$ip" && "$ip" != 169.254.* ]]; then
    echo "   → Enter URL manually : http://${ip}:8081"
  else
    echo "   → Enter URL manually : http://<IP-du-Mac>:8081"
    echo "   (IP Mac introuvable / link-local — Mac et iPhone sur le même Wi‑Fi)"
  fi
  echo "   Ne pas réutiliser une URL 169.254.x.x (ça ne marche pas)."
  echo "   Backend API attendu : ${EXPO_PUBLIC_API_URL:-$DEFAULT_API_URL}"
  echo "   (lance ./mobile.sh site ou ./runsh.sh dans un autre terminal si besoin)"
  echo ""
}

cmd_start() {
  cd_mobile
  print_dev_client_connect_help
  if [[ "${1:-}" == "--clear" ]]; then
    echo "🚇 expo start --clear"
    pnpm exec expo start --clear
  else
    echo "🚇 expo start"
    pnpm exec expo start
  fi
}

cmd_web() {
  cd_mobile
  export EXPO_PUBLIC_API_URL="${EXPO_PUBLIC_API_URL:-$DEFAULT_API_URL}"
  echo "🌐 Expo web (pnpm web) — API: $EXPO_PUBLIC_API_URL"
  echo "   Ouvre : http://localhost:8081/newqr"
  if [[ "$EXPO_PUBLIC_API_URL" == *"localhost"* ]] || [[ "$EXPO_PUBLIC_API_URL" == *"127.0.0.1"* ]]; then
    echo "   Backend local requis : ./mobile.sh site  (DB peut être distante)"
  else
    echo "   API distante — pas besoin de ./mobile.sh site"
  fi
  pnpm web
}

cmd_newqr() {
  echo "📦 Export Expo web → public/newqr (baseUrl=/newqr)…"
  (cd "$ROOT_DIR" && pnpm newqr:build)
  echo ""
  echo "✅ Accessible via Next : http://localhost:3000/newqr"
  echo "   (relance ./runsh.sh si le serveur tourne déjà — fichiers dans public/newqr)"
}

cmd_site() {
  echo "🌐 Backend Next.js (./runsh.sh)…"
  exec "$ROOT_DIR/runsh.sh"
}

cmd_open() {
  local project
  if ! project="$(find_xcode_project)"; then
    echo "🧱 Aucun projet Xcode — prebuild…"
    cmd_prebuild
    if ! project="$(find_xcode_project)"; then
      echo "❌ Toujours aucun .xcworkspace / .xcodeproj dans ios/"
      exit 1
    fi
  fi
  echo "📂 Ouverture Xcode: $project"
  open "$project"
}

cmd_pods() {
  cd_mobile
  if [[ ! -d ios ]]; then
    echo "❌ Dossier ios/ absent. Lance : ./mobile.sh prebuild"
    exit 1
  fi
  echo "📦 pod install…"
  (cd ios && pod install)
}

cmd_clean() {
  echo "🧹 Nettoyage DerivedData (qrious / QRious)…"
  rm -rf "$HOME"/Library/Developer/Xcode/DerivedData/qrious-* \
         "$HOME"/Library/Developer/Xcode/DerivedData/QRious-* 2>/dev/null || true
  echo "🧹 Suppression ios/…"
  rm -rf "$MOBILE_DIR/ios"
  echo "✅ Nettoyage terminé. Relance : ./mobile.sh prebuild && ./mobile.sh ios"
}

cmd_doctor() {
  cd_mobile
  pnpm exec expo-doctor || pnpm exec expo doctor || true
}

cmd_all() {
  local clean_args=()
  local sim="$DEFAULT_SIMULATOR"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --clean) clean_args+=(--clean); shift ;;
      --simulator)
        sim="${2:-}"
        [[ -n "$sim" ]] || { echo "❌ --simulator requiert un nom"; exit 1; }
        shift 2
        ;;
      *)
        sim="$1"
        shift
        ;;
    esac
  done
  cmd_prebuild "${clean_args[@]+"${clean_args[@]}"}"
  cmd_ios --simulator "$sim"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if [[ $# -eq 0 ]]; then
  usage
  exit 0
fi

case "$1" in
  -H|-h|--help|help)
    usage
    exit 0
    ;;
esac

setup_node

CMD="$1"
shift

case "$CMD" in
  prebuild|rebuild) cmd_prebuild "$@" ;;
  ios|run)          cmd_ios "$@" ;;
  device|iphone|phone) cmd_device "$@" ;;
  native|release|standalone) cmd_native "$@" ;;
  eas:preview|eas-preview) cmd_eas_preview "$@" ;;
  eas:production|eas-production) cmd_eas_production "$@" ;;
  devices)          cmd_devices "$@" ;;
  sim|last)         cmd_sim "$@" ;;
  start)            cmd_start "$@" ;;
  web)              cmd_web "$@" ;;
  newqr|editeur|export|export:web|export-web) cmd_newqr "$@" ;;
  site)             cmd_site "$@" ;;
  open|xcode)       cmd_open "$@" ;;
  pods)             cmd_pods "$@" ;;
  clean)            cmd_clean "$@" ;;
  doctor)           cmd_doctor "$@" ;;
  all)              cmd_all "$@" ;;
  *)
    echo "❌ Commande inconnue: $CMD"
    echo ""
    usage
    exit 1
    ;;
esac
