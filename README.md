# ProductGuru

ProductGuru is a production-oriented MVP for PM interview practice. It provides curated PM questions, typed/voice answers, AI evaluation with rubric scoring, and a progress history dashboard.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- OpenAI API + Zod validation
- Local JSON persistence fallback (`data/attempts.json`)

## Features
- Premium dark landing page
- Practice Studio with:
  - random + filtered question generation
  - typing answer mode
  - microphone recording + transcription API flow
  - LLM evaluation with strict JSON schema
  - scores, strengths, improvements, missed angles, follow-ups, exemplar responses
- History page with score trend chart and recent attempts
- 64 curated PM interview questions (8 categories × 8 prompts)

## Setup
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Environment variables
Create `.env.local`:
```bash
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

> Supabase variables are placeholders for future upgrade; current MVP uses local JSON storage.

## Seed question bank
Question bank is code-based at `data/questions.ts` and auto-loaded at runtime.

## Build and run production
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push repo to GitHub.
2. Import project into Vercel.
3. Set env vars (`OPENAI_API_KEY`, `NEXT_PUBLIC_APP_URL`).
4. Deploy.

## Limitations
- Google login and leaderboard are not implemented yet.
- Transcription/evaluation fallback is used when `OPENAI_API_KEY` is missing.
- Local JSON storage is single-instance and not multi-user safe.

## Roadmap
- Add NextAuth + Google OAuth
- Add Supabase persistence + leaderboard
- Add interview/coaching mode switches with timers and hint toggles
- Add richer charts by rubric dimension over time
