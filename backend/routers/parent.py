from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(prefix="/parent", tags=["parent dashboard"])


@router.get("/children")
async def get_children():
    return [
        {"child_id": 1, "username": "creative_kid", "display_name": "Creative Kid"},
    ]


@router.get("/children/{child_id}/activity")
async def get_child_activity(child_id: Annotated[int, Path(ge=1)]):
    return {
        "child_id": child_id,
        "posts_today": 2,
        "time_spent_minutes": 45,
        "streak": 5,
    }


@router.patch("/children/{child_id}/settings")
async def update_child_settings(child_id: Annotated[int, Path(ge=1)]):
    return {"message": "Settings updated", "child_id": child_id}


@router.post("/children/{child_id}/communities/approve")
async def approve_community_join(child_id: Annotated[int, Path(ge=1)]):
    return {"message": "Community join approved", "child_id": child_id}
