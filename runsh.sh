#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Erreur : pnpm n'est pas installé."
  echo "Installez-le avec : corepack enable && corepack prepare pnpm@latest --activate"
  exit 1
fi

# .env d'abord, puis .env.local écrase (priorité Next.js)
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [ -f .env.local ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
else
  echo ""
  echo "⚠️  Fichier .env.local introuvable !"
  echo "   Créez-le avec votre URL Postgres Coolify :"
  echo "   cp .env.local.example .env.local"
  echo ""
  exit 1
fi

# Bloquer toute config MongoDB résiduelle
if [[ "${DATABASE_URI:-}" == mongodb* ]] || [[ "${DATABASE_URL:-}" == mongodb* ]]; then
  echo "Erreur : MongoDB détecté dans DATABASE_URI — utilisez postgresql://"
  exit 1
fi

DB_CHECK="${DATABASE_URI:-${DATABASE_URL:-}}"
if [ -z "$DB_CHECK" ] && [ -z "${POSTGRES_HOST:-}" ]; then
  echo "Erreur : configurez DATABASE_URI ou POSTGRES_* dans .env.local"
  exit 1
fi

if [ -n "$DB_CHECK" ] && [[ ! "$DB_CHECK" =~ ^postgres ]]; then
  echo "Erreur : DATABASE_URI doit commencer par postgresql://"
  exit 1
fi

if [[ "$DB_CHECK" == *'VOTRE-HOST-COOLIFY'* ]] || [[ "$DB_CHECK" == *'USER:PASSWORD'* ]]; then
  echo "Erreur : DATABASE_URI contient encore des placeholders dans .env.local"
  exit 1
fi

# Évite les serveurs Next.js fantômes qui gardent d'anciennes variables d'env
if command -v lsof >/dev/null 2>&1; then
  STALE_PIDS="$(lsof -ti :3000 2>/dev/null || true)"
  if [ -n "$STALE_PIDS" ]; then
    echo "→ Arrêt du processus sur le port 3000 ($STALE_PIDS)..."
    kill $STALE_PIDS 2>/dev/null || true
    sleep 1
  fi
fi

if [ ! -d node_modules ]; then
  echo "→ Installation des dépendances (pnpm install)..."
  pnpm install
fi

echo "→ Démarrage du projet..."
echo "   Site vitrine  : http://localhost:3000/"
echo "   Admin QR codes: http://localhost:3000/dashboard"
echo "   (Si Drizzle pose une question dans ce terminal, choisissez « create », pas « rename ».)"
exec pnpm dev
