# IronMind

Next-Gen AI Psychologist & Coach — MVP scaffold

## Structure

- `docs/whitepaper_audit.md` — Deep audit and implementation plan
- `backend/` — TypeScript Express API scaffold
- `mobile/` — (planned) React Native app via Expo

## Backend (API)

Requirements: Node 18+

1. Copy `.env.example` to `.env` and edit as needed.
2. Install deps
   ```bash
   cd backend
   npm install
   ```
3. Run in dev
   ```bash
   npm run dev
   ```
4. Health check
   - GET http://localhost:4000/api/health

Endpoints (MVP)
- POST `/api/checkins` — create voice check-in (schema in `src/schemas/voice.ts`)
- GET `/api/checkins` — list recent check-ins (in-memory)
- POST `/api/habits` — create habit event
- GET `/api/habits` — list habit events
- POST `/api/goals` — create goal
- GET `/api/goals` — list goals
- POST `/api/tasks` — create task
- GET `/api/tasks` — list tasks

Note: Data is stored in-memory for scaffold. Replace with Postgres in Phase 1.

## Mobile (Expo)

Will be added next: Expo RN app with screens for Check-in, Plan, Habits, Goals, Settings.

## Security & Privacy

- Local-first philosophy for audio features; this API is scaffold only, not handling raw audio yet.
- Add auth/JWT before external exposure.
