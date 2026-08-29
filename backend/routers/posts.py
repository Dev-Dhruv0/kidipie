from typing import Annotated

from fastapi import APIRouter, Path, Depends, HTTPException

from database import supabase
from schemas.posts import (PostResponse, PostRequest, DeletePostResponse, PostStatusResponse)

from routers.auth import verify_token

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("/create", response_model=PostResponse)
async def create_post(post: PostRequest, user_id: str = Depends(verify_token)):
    try:
        response = supabase.table('posts').insert({
            "user_id": user_id,
            "content": post.content,
            "image_url": post.image_url,
        }).execute()
    except Exception:
        raise HTTPException(
            status_code=500, 
            detail="Failed to create post"
            )

    return response.data[0]


@router.get("/list", response_model=list[PostResponse])
async def list_posts():
    # Fetch all posts from the database
    response = supabase.table("posts").select("*").execute()

    return response.data    


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: Annotated[int, Path(ge=1)]):
    # Fetch the post from Supabase using its post ID
    response = (
        supabase
        .table("posts")
        .select("*")
        .eq("post_id", post_id)
        .execute()
    )

    # Return an error if the requested post does not exist
    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )
    
    return response.data[0]


@router.delete("/{post_id}", response_model=DeletePostResponse)
async def delete_post(post_id: Annotated[int, Path(ge=1)]):
    # Delete the post from the database using its post ID
    response = (
        supabase
        .table("posts")
        .delete()
        .eq("post_id", post_id)
        .execute()
    )

    # Return an error if the requested post does not exist
    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )
    
    return {
        "message": "Post Deleted",
        "post_id": post_id
    }


@router.get("/{post_id}/status", response_model=PostStatusResponse)
async def get_post_status(post_id: Annotated[int, Path(ge=1)]):
    # Placeholder until post status is stored in the database
    return {
        "post_id": post_id, 
        "status": "approved",
        }
