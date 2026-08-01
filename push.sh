#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v git >/dev/null 2>&1; then
  echo "Erreur : git n'est pas installé."
  exit 1
fi

if [ ! -d .git ]; then
  echo "Erreur : ce dossier n'est pas un dépôt git."
  echo "Initialisez-le avec : git init && git remote add origin <url>"
  exit 1
fi

# Message de commit (argument ou valeur par défaut)
if [ $# -gt 0 ]; then
  MESSAGE="$*"
else
  MESSAGE="chore: update $(date '+%Y-%m-%d %H:%M')"
fi

# Ne jamais committer les secrets
SECRET_FILES=(.env .env.local)
for f in "${SECRET_FILES[@]}"; do
  if git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
    echo "Erreur : $f est suivi par git — retirez-le avant de pousser :"
    echo "  git rm --cached $f"
    exit 1
  fi
done

echo "→ Branche : $(git branch --show-current)"
echo "→ Message : $MESSAGE"

git add -A

# Exclure explicitement les fichiers sensibles s'ils ont été stagés
git reset HEAD -- .env .env.local 2>/dev/null || true

if git diff --cached --quiet; then
  echo "Rien à committer."
else
  git commit -m "$MESSAGE"
  echo "✓ Commit créé"
fi

# Push (crée le tracking remote si besoin)
CURRENT_BRANCH="$(git branch --show-current)"

if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  echo "→ Push vers upstream..."
  git push
else
  if ! git remote get-url origin >/dev/null 2>&1; then
    echo "Erreur : remote « origin » introuvable."
    echo "Ajoutez-le avec : git remote add origin <url>"
    exit 1
  fi
  echo "→ Premier push de la branche $CURRENT_BRANCH..."
  git push -u origin "$CURRENT_BRANCH"
fi

echo "✓ Push terminé"
git status -sb
