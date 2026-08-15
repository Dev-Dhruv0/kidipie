from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup")
async def signup():
    return {"message": "User registered", "user_id": 1, "consent_required": True}


@router.post("/parent/consent")
async def parent_consent():
    return {"message": "Child account approved", "child_id": 1}


@router.post("/login")
async def login():
    return {"access_token": "fake-token-123", "token_type": "bearer"}


@router.post("/logout")
async def logout():
    return {"message": "Logged out"}


@router.get("/me")
async def get_me():
    return {
        "user_id": 1,
        "username": "creative_kid",
        "display_name": "Creative Kid",
        "role": "child",
    }


@router.post("/refresh")
async def refresh_token():
    return {"access_token": "fake-refreshed-token-456", "token_type": "bearer"}
