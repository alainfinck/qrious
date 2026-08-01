#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Supprime toute URI héritée du shell (Next.js ne l'écrase pas si déjà définie)
unset DATABASE_URI DATABASE_URL 2>/dev/null || true

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
  echo "Erreur : .env.local introuvable"
  exit 1
fi

if [[ "${DATABASE_URI:-}" == mongodb* ]] || [[ "${DATABASE_URL:-}" == mongodb* ]]; then
  echo "Erreur : DATABASE_URI dans .env.local pointe vers MongoDB — utilisez postgresql://"
  exit 1
fi

DB_CHECK="${DATABASE_URI:-${DATABASE_URL:-}}"
if [ -z "$DB_CHECK" ] && [ -z "${POSTGRES_HOST:-}" ]; then
  echo "Erreur : configurez DATABASE_URI dans .env.local"
  exit 1
fi

if [ -n "$DB_CHECK" ] && [[ ! "$DB_CHECK" =~ ^postgres ]]; then
  echo "Erreur : DATABASE_URI doit commencer par postgresql://"
  exit 1
fi

echo "→ BDD : ${DATABASE_URI:-${DATABASE_URL:-postgres via POSTGRES_*}}"

exec pnpm exec next dev "$@"
