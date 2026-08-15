from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(tags=["streaks & rewards"])


@router.get("/tasks/daily")
async def get_daily_tasks():
    return [
        {"task_id": 1, "title": "Draw something you love", "completed": False},
        {"task_id": 2, "title": "Write a 3-line poem", "completed": False},
    ]


@router.post("/tasks/daily/{task_id}/complete")
async def complete_daily_task(task_id: Annotated[int, Path(ge=1)]):
    return {"message": "Task completed", "task_id": task_id, "streak_updated": True}


@router.get("/streaks/me")
async def get_my_streak():
    return {"current_streak": 5, "longest_streak": 12, "last_activity": "2026-08-15"}


@router.get("/badges")
async def list_badges():
    return [
        {"badge_id": 1, "name": "First Post", "description": "Upload your first creation"},
        {"badge_id": 2, "name": "3-Day Streak", "description": "Keep creating for 3 days"},
        {"badge_id": 3, "name": "Community Star", "description": "Get 10 reactions"},
    ]


@router.get("/badges/me")
async def get_my_badges():
    return [
        {"badge_id": 1, "name": "First Post", "earned_at": "2026-01-15"},
    ]


@router.get("/rewards/currency/me")
async def get_my_currency():
    return {"balance": 150, "currency": "stars"}


@router.get("/rewards/store")
async def get_store_items():
    return [
        {"item_id": 1, "name": "Cool Avatar Frame", "cost": 50},
        {"item_id": 2, "name": "Rainbow Pen", "cost": 100},
    ]


@router.post("/rewards/store/{item_id}/redeem")
async def redeem_item(item_id: Annotated[int, Path(ge=1)]):
    return {"message": "Item redeemed", "item_id": item_id, "remaining_balance": 100}
