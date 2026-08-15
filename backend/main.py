from fastapi import FastAPI

from routers import (
    auth,
    chatbot,
    communities,
    engagement,
    moderation,
    parent,
    posts,
    streaks_rewards,
    users,
)

app = FastAPI(title="Kids Creative Platform API", version="v1")

# Include all routers under /api/v1
for router_module in [
    auth,
    users,
    posts,
    engagement,
    streaks_rewards,
    communities,
    chatbot,
    moderation,
    parent,
]:
    app.include_router(router_module.router, prefix="/api/v1")
