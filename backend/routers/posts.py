from typing import Annotated
from fastapi import APIRouter, Path, HTTPException
from pydantic import BaseModel
import uuid
from database import supabase_admin, supabase
import jwt

router = APIRouter(prefix="/posts", tags=["posts"])


class Post(BaseModel):
    image_url: str
    content: str


@router.post("/create")
async def create_post(post: Post):
    try:
        data = supabase.table('posts').insert({
            post
        }).execute()
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

    return data.data


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
