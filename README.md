# Turf Finder & Management System

A full-stack starter platform for discovering sports turfs, managing turf listings, and finding nearby events.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Spring Boot 3 REST API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Firebase Auth (JWT)

## Features
- Turf discovery with dynamic filters, sports quick chips, and live loading states
- Turf management CRUD (secured for managers/admins)
- Nearby events discovery by geolocation radius + current location autofill
- Role-based API authorization
- Input validation and centralized exception handling

## Project Structure
- `frontend/` React application
- `backend/` Spring Boot API
- `db/` Supabase schema and seed SQL

## Quick Start

### 1) Database (Supabase)
Run SQL scripts in Supabase SQL editor:
1. `db/schema.sql`
2. `db/seed.sql`

### 2) Backend
```bash
cd backend
mvn spring-boot:run
```

Environment variables:
- `SUPABASE_DB_URL`
- `SUPABASE_DB_USERNAME`
- `SUPABASE_DB_PASSWORD`
- `FIREBASE_PROJECT_ID`

### 3) Frontend
```bash
cd frontend
npm install
npm run dev
```

Environment variables:
- `VITE_API_BASE_URL` (default `http://localhost:8080/api`)
- Firebase config variables (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, ...)

## Security Notes
- Backend validates Firebase ID tokens from `Authorization: Bearer <token>`.
- Public endpoints: health check, turf listing/details, nearby event search.
- Manager/Admin endpoints: turf creation, updates, and delete.
- CORS restricted to configured frontend origin via `FRONTEND_ORIGIN`.

## Deployment

### Option A: Docker Compose (recommended for quick deploy)
1. Copy env template:
   ```bash
   cp .env.example .env
   ```
2. Fill all required variables in `.env`.
3. Add Firebase Admin service-account file to `deploy/firebase-service-account.json`.
4. Start services:
   ```bash
   docker compose up --build -d
   ```
5. Access:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080/api/health`

### Option B: Cloud deploy
- **Backend on Render**: use `render.yaml` and set env vars + secret file for Firebase credentials.
- **Frontend on Vercel**:
  1. Import the `frontend/` directory as a Vercel project.
  2. Keep framework as **Vite** and config from `frontend/vercel.json`.
  3. Add env vars in Vercel project settings (`VITE_API_BASE_URL`, Firebase client vars).
  4. Set production domain and redeploy.

### GitHub Actions deployment to Vercel
Use `.github/workflows/deploy-vercel.yml` with repo secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The workflow executes `deploy/vercel-deploy.sh` to run `vercel pull`, `vercel build`, and `vercel deploy --prod` for the frontend.

### CI build validation
A basic GitHub Actions workflow is included at `.github/workflows/deploy-preview.yml` to build backend and frontend container images on push or manual trigger.
