#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-both}"
URL_FILE="deploy/latest-urls.env"
: > "$URL_FILE"

run_frontend() {
  echo "[deploy] frontend -> vercel"
  ./deploy/vercel-deploy.sh
}

run_backend() {
  echo "[deploy] backend -> render"

  if [[ -z "${RENDER_DEPLOY_HOOK_URL:-}" ]]; then
    echo "RENDER_DEPLOY_HOOK_URL is required for backend deployment"
    exit 1
  fi

  RESPONSE=$(curl -fsS -X POST "$RENDER_DEPLOY_HOOK_URL")
  echo "Render deploy triggered"
  echo "$RESPONSE"

  # Render deploy hooks typically return JSON with details.
  # Save a dashboard hint for quick navigation.
  printf 'BACKEND_STATUS=Triggered via Render deploy hook\n' >> "$URL_FILE"
}

case "$TARGET" in
  frontend)
    run_frontend
    ;;
  backend)
    run_backend
    ;;
  both)
    run_frontend
    run_backend
    ;;
  *)
    echo "Usage: $0 [frontend|backend|both]"
    exit 1
    ;;
esac

echo "Deployment output file: $URL_FILE"
cat "$URL_FILE"
