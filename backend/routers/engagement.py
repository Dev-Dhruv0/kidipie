from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(tags=["engagement"])


@router.post("/posts/{post_id}/reactions")
async def add_reaction(post_id: Annotated[int, Path(ge=1)]):
    return {"message": "Reaction added", "post_id": post_id, "reaction": "love"}


@router.delete("/posts/{post_id}/reactions")
async def remove_reaction(post_id: Annotated[int, Path(ge=1)]):
    return {"message": "Reaction removed", "post_id": post_id}


@router.get("/posts/{post_id}/reactions")
async def get_reactions(post_id: Annotated[int, Path(ge=1)]):
    return {"post_id": post_id, "like": 5, "love": 3, "wow": 1}


@router.post("/posts/{post_id}/replies")
async def add_reply(post_id: Annotated[int, Path(ge=1)]):
    return {
        "reply_id": 1,
        "post_id": post_id,
        "text": "Great work!",
        "status": "pending_moderation",
    }


@router.get("/posts/{post_id}/replies")
async def get_replies(post_id: Annotated[int, Path(ge=1)]):
    return [
        {"reply_id": 1, "text": "Great work!", "user_id": 2},
        {"reply_id": 2, "text": "So creative!", "user_id": 3},
    ]


@router.delete("/replies/{reply_id}")
async def delete_reply(reply_id: Annotated[int, Path(ge=1)]):
    return {"message": "Reply deleted", "reply_id": reply_id}
