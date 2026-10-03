from uuid import UUID

from fastapi import APIRouter, HTTPException

from database import supabase
from schemas.users import UserResponse
from schemas.posts import PostResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: UUID):
    # Fetch the user's profile from Supabase using their UUID
    response = (
        supabase
        .table("users")
        .select("*")
        .eq("user_id", str(user_id))
        .execute()
    )

    # Return an error if the requested user does not exist.
    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return response.data[0]

# Fetch all posts with user info and reaction counts
@router.get("/{user_id}/posts", response_model=list[PostResponse])
async def get_user_posts(user_id: UUID):
    # Fetch all posts created by the specified user
    response = (
        supabase
        .table("posts")
        .select("*, users(user_id, username, image_url), reactions(*)")
        .eq("user_id", str(user_id))
        .order("created_at", desc=True)
        .execute()
    )

    posts = response.data or []

    for post in posts:
        reaction_counts = {}

        for reaction in post.pop("reactions", []) or []:
            reaction_type = reaction["reaction_type"]
            reaction_counts[reaction_type] = (
                reaction_counts.get(reaction_type, 0) + 1
            )
        post["reactions"] = reaction_counts

    return posts

@router.get("/{user_id}/badges")
async def get_user_badges(user_id: UUID):
    # Placeholder until the badge system is implemented
    return [
        {"badge_id": 1, "name": "First Post", "earned_at": "2026-01-15"},
        {"badge_id": 2, "name": "3-Day Streak", "earned_at": "2026-02-01"},
    ]


@router.get("/{user_id}/streak")
async def get_user_streak(user_id: UUID):
    # Placeholder until the streak system is implemented
    return {"user_id": user_id, "current_streak": 5, "longest_streak": 12}


@router.delete("/{user_id}")
async def delete_user(user_id: UUID):
    # Placeholder until the account deletion is implemented
    return {"message": "Account deactivated", "user_id": user_id}
