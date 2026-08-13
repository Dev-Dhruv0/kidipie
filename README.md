# [Project Name TBD] 🎨

A safe, activity-first platform for kids (under 16) to connect, create, and share — built for age groups who can't (or shouldn't) use mainstream social media.

## What We're Building

This is **not a social media app**. It's a place where kids can:
- Share creative work (drawings, writing, projects)
- Get positive, structured engagement from peers their own age
- Build daily habits through fun tasks and streaks
- Join communities around shared interests/hobbies
- Get help navigating the platform via a simple chatbot

The core design principle: **interaction happens through activities, not open-ended chat.** This keeps kids safer and gives parents confidence letting their kids use it. Every feature we build should be checked against this principle — if it starts to feel like a chat app with extras bolted on, we're drifting off course.

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Backend | FastAPI (Python) | Business logic, moderation pipeline, API layer |
| Frontend | React + Tailwind CSS | Component-based UI, mobile-friendly |
| Database | Firebase (Firestore) — SQLite for early local dev | Firebase for auth, real-time data, storage; SQLite while we prototype backend logic offline |
| Version Control | Git | See branching convention below |

**Why this stack:** FastAPI gives us a typed, testable backend for logic Firebase can't handle alone (currency/streak calculations, content moderation checks). Firebase handles auth, real-time listeners, and storage without us building that infra ourselves. React + Tailwind lets us move fast on UI while keeping full design control.

## Initial Features (v1 Scope)

1. **Post Upload** — Kids upload creative work (drawings, writing, etc.) to their profile/community feed.
2. **Engagement Replies** — Structured, positive-only reactions (like/love/etc.) and possibly templated comments instead of free-text, to keep interactions safe and low-risk.
3. **Daily Streaks & Rewards** — Daily tasks assigned to users; completion builds a streak; streaks/milestones earn badges (and later, in-app currency).
4. **Communities** — Interest/hobby-based groups kids can join to see and share relevant posts.
5. **Help Chatbot** — A simple bot to answer "how do I..." platform questions (not a general-purpose chat companion).
6. **UI Styling** — One team member owns visual design/styling consistency across all screens (Tailwind-based).

### Explicitly Out of Scope for v1
- Direct/private messaging between kids
- Open free-text public comments (revisit later, only with strong moderation)
- Any monetization or real-money mechanics tied to in-app currency

## Non-Negotiables (Read Before Building)

Because our users are minors, some things aren't optional:
- **No open free-text chat** between kids in v1 — use reactions/templated replies only.
- **All uploaded content (posts, images) must pass through a moderation check** before being visible to other users — never write directly from client to Firestore/Storage for public content.
- **No behavioral ad tracking, no targeted ads.** Ever.
- **Parental visibility** is a feature, not an afterthought — even a v1 parent view (activity summary) builds trust.
- Keep an eye on **COPPA** (US) and **UK/EU Age Appropriate Design Code** requirements as we build auth/data flows — these affect how we design consent and data storage from day one, not something to patch in later.

## Project Structure (proposed)

```
/backend         → FastAPI app
  /routers        → API route modules (posts, streaks, communities, chatbot)
  /services        → Business logic (moderation, streak calc, rewards)
  /models          → Pydantic schemas
/frontend        → React + Tailwind app
  /src/components   → Reusable UI components
  /src/pages        → Route-level pages
  /src/hooks        → Custom hooks (Firebase listeners, auth state)
/docs            → Design notes, feature specs, meeting notes
```

*(Adjust as we go — this is a starting point, not gospel.)*

## Branching Convention

- `main` — stable, always deployable
- `dev` — integration branch
- `feature/<short-name>` — individual feature branches, merged into `dev` via PR

## Getting Started

*(Fill in once backend/frontend setup is finalized — venv setup, `.env` structure, Firebase config steps, etc.)*

## Team Notes

This is our first group project together, so expect some trial and error in workflow — that's normal. Let's use `/docs` for anything we don't want lost in Slack/Discord chat history (decisions, why we chose X over Y, etc.).
