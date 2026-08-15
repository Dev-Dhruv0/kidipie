# Backend

FastAPI backend with stub route implementations.

## Setup

```bash
uv sync
```

## Run

```bash
uv run fastapi dev
```

Docs at `http://127.0.0.1:8000/docs`

## Structure

```
main.py              # App entry, includes all routers under /api/v1
routers/
├── auth.py          # Signup, login, logout, token refresh
├── users.py         # Profile CRUD, user posts/badges/streak
├── posts.py         # Create, list, get, delete posts + moderation status
├── engagement.py    # Reactions and replies on posts
├── streaks_rewards.py # Daily tasks, streaks, badges, currency, store
├── communities.py   # Community CRUD, join/leave, members
├── chatbot.py       # Help chatbot messages, FAQ
├── moderation.py    # Moderation queue, approve/reject, reports
└── parent.py        # Parent dashboard, child activity/settings
extra/
└── routes.json      # Full route spec (source of truth)
```

## Status

- [x] All 48 routes stubbed with hardcoded responses
- [ ] Pydantic request/response models
- [ ] Auth (tokens, guards, parent_only, admin_only)
- [ ] Database integration
- [ ] Moderation service
