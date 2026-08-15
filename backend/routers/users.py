from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}")
async def get_user(user_id: Annotated[int, Path(ge=1)]):
    return {
        "user_id": user_id,
        "username": "creative_kid",
        "display_name": "Creative Kid",
        "avatar": "default.png",
        "interests": ["drawing", "writing"],
    }


@router.patch("/{user_id}")
async def update_user(user_id: Annotated[int, Path(ge=1)]):
    return {"message": "Profile updated", "user_id": user_id}


@router.get("/{user_id}/posts")
async def get_user_posts(user_id: Annotated[int, Path(ge=1)]):
    return [
        {"post_id": 1, "title": "My Drawing", "type": "drawing", "user_id": user_id},
        {"post_id": 2, "title": "My Story", "type": "writing", "user_id": user_id},
    ]


@router.get("/{user_id}/badges")
async def get_user_badges(user_id: Annotated[int, Path(ge=1)]):
    return [
        {"badge_id": 1, "name": "First Post", "earned_at": "2026-01-15"},
        {"badge_id": 2, "name": "3-Day Streak", "earned_at": "2026-02-01"},
    ]


@router.get("/{user_id}/streak")
async def get_user_streak(user_id: Annotated[int, Path(ge=1)]):
    return {"user_id": user_id, "current_streak": 5, "longest_streak": 12}


@router.delete("/{user_id}")
async def delete_user(user_id: Annotated[int, Path(ge=1)]):
    return {"message": "Account deactivated", "user_id": user_id}