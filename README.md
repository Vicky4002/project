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
