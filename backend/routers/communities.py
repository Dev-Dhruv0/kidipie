from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(prefix="/communities", tags=["communities"])


@router.get("")
async def list_communities():
    return [
        {"community_id": 1, "name": "Artists Corner", "members": 42},
        {"community_id": 2, "name": "Young Writers", "members": 28},
    ]


@router.post("")
async def create_community():
    return {"community_id": 3, "name": "New Community", "members": 1}


@router.get("/{community_id}")
async def get_community(community_id: Annotated[int, Path(ge=1)]):
    return {
        "community_id": community_id,
        "name": "Artists Corner",
        "description": "A place for young artists",
        "members": 42,
    }


@router.post("/{community_id}/join")
async def join_community(community_id: Annotated[int, Path(ge=1)]):
    return {"message": "Joined community", "community_id": community_id}


@router.post("/{community_id}/leave")
async def leave_community(community_id: Annotated[int, Path(ge=1)]):
    return {"message": "Left community", "community_id": community_id}


@router.get("/{community_id}/posts")
async def get_community_posts(community_id: Annotated[int, Path(ge=1)]):
    return [
        {"post_id": 1, "title": "My Drawing", "community_id": community_id},
    ]


@router.get("/{community_id}/members")
async def get_community_members(community_id: Annotated[int, Path(ge=1)]):
    return [
        {"user_id": 1, "username": "creative_kid"},
        {"user_id": 2, "username": "artist_girl"},
    ]
