from typing import Annotated
from fastapi import APIRouter, Path, HTTPException, Depends
from pydantic import BaseModel
from database import supabase, supabase_admin
from .auth import get_current_user_id

router = APIRouter(prefix="/posts", tags=["posts"])


class PostCreate(BaseModel):
    image_url: str | None = None
    content: str


@router.post("/")
def create_post(payload: PostCreate, auth_id: str = Depends(get_current_user_id)):
    # look up your internal users.user_id from auth_id, since your posts.user_id
    # references public.users, not auth.users directly
    user_row = supabase_admin.table("users").select("user_id").eq("user_id", auth_id).execute()

    if not user_row.data:
        raise HTTPException(404, "User profile not found")
    try:
        result = supabase_admin.table("posts").insert({
            "user_id": auth_id,
            "content": payload.content,
            "image_url": payload.image_url
        }).execute()
    except Exception as e:
        raise HTTPException(400, f"Failed to create post: {str(e)}")

    return result.data[0]


@router.get("/list")
async def list_posts():
    return [
        {"post_id": 1, "title": "My Drawing", "type": "drawing", "status": "approved"},
        {"post_id": 2, "title": "A Short Story", "type": "writing", "status": "approved"},
    ]


@router.get("/{post_id}")
async def get_post(post_id: Annotated[int, Path(ge=1)]):
    return {
        "post_id": post_id,
        "title": "My Drawing",
        "type": "drawing",
        "user_id": 1,
        "status": "approved",
    }


@router.delete("/{post_id}")
async def delete_post(post_id: Annotated[int, Path(ge=1)]):
    return {"message": "Post deleted", "post_id": post_id}


@router.get("/{post_id}/status")
async def get_post_status(post_id: Annotated[int, Path(ge=1)]):
    return {"post_id": post_id, "status": "approved"}
