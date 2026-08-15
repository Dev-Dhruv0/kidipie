from typing import Annotated

from fastapi import APIRouter, Path

router = APIRouter(prefix="/moderation", tags=["moderation"])


@router.get("/queue")
async def get_moderation_queue():
    return [
        {"content_id": 1, "type": "post", "title": "My Drawing", "status": "pending"},
        {"content_id": 2, "type": "reply", "text": "Nice!", "status": "pending"},
    ]


@router.post("/{content_id}/approve")
async def approve_content(content_id: Annotated[int, Path(ge=1)]):
    return {"message": "Content approved", "content_id": content_id}


@router.post("/{content_id}/reject")
async def reject_content(content_id: Annotated[int, Path(ge=1)]):
    return {"message": "Content rejected", "content_id": content_id}


@router.post("/report")
async def report_content():
    return {"message": "Report submitted", "report_id": 1}
