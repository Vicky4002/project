#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-both}"

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

  curl -fsS -X POST "$RENDER_DEPLOY_HOOK_URL" >/tmp/render-deploy-response.json
  echo "Render deploy triggered"
  cat /tmp/render-deploy-response.json || true
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
