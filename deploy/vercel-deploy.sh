#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN is required"
  exit 1
fi

if [[ -z "${VERCEL_ORG_ID:-}" || -z "${VERCEL_PROJECT_ID:-}" ]]; then
  echo "VERCEL_ORG_ID and VERCEL_PROJECT_ID are required"
  exit 1
fi

cd frontend

# Pull remote project settings + env metadata
npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"

# Build locally using Vercel build pipeline
npx vercel build --prod --token "$VERCEL_TOKEN"

# Deploy prebuilt output and capture deployment URL
DEPLOY_URL=$(npx vercel deploy --prebuilt --prod --token "$VERCEL_TOKEN")
DEPLOY_URL=$(echo "$DEPLOY_URL" | tail -n 1)

echo "Frontend deployed: $DEPLOY_URL"

# Persist URL for CI/workflow summary
printf 'FRONTEND_URL=%s\n' "$DEPLOY_URL" > ../deploy/latest-urls.env
