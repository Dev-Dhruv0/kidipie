from fastapi import APIRouter

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


@router.post("/message")
async def send_message():
    return {
        "response": "Hi there! I'm the KidiPie helper bot. How can I help you today?",
    }


@router.get("/faq")
async def get_faq():
    return [
        {"id": 1, "question": "How do I post a drawing?", "answer": "Tap the + button and choose 'Drawing'!"},
        {"id": 2, "question": "What are streaks?", "answer": "Complete daily tasks to build your streak!"},
        {"id": 3, "question": "How do I earn badges?", "answer": "Create posts, get reactions, and keep your streak going!"},
    ]
