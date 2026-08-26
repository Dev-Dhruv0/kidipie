from typing import Annotated
from pydantic import BaseModel
from fastapi import APIRouter, Path, HTTPException
from database import supabase, supabse_admin

router = APIRouter(prefix="/users", tags=["users"])


class SignupRequest(BaseModel):
    username: str
    full_name: str
    age: int
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(payload: LoginRequest):
    try:
        result = supabase.auth.sign_in_with_password({
            "email": payload.email,
            "password": payload.password
        })
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

    return {
        "access_token": result.session.access_token,
        "refresh_token": result.session.refresh_token,
        "user_id": result.user.id,  # this is the auth.users.id / your users.auth_id
    }


@router.post("/signup")
def signup(payload: SignupRequest):
    result = supabase.auth.sign_up({
        "email": payload.email,
        "password": payload.password
    })
    if result.user is None:
        raise HTTPException(status_code=400, detail="Signup failed")

    # now create the matching row in public.users
    supabse_admin.table("users").insert({
        "user_id": result.user.id,
        "email": payload.email,
        "username": payload.username,
        "full_name": payload.full_name,
        "age": payload.age
    }).execute()

    return {"user_id": result.user.id}


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
