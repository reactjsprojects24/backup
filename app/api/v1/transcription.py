from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Dict
import uuid
import os
from datetime import datetime

router = APIRouter()

AUDIO_STORAGE = "audio_storage"
TRANSCRIPT_DB: Dict[str, Dict] = {}  # Simulated in-memory DB


# Request schema
class TranscriptionRequest(BaseModel):
    audio_id: str
    language: str
    model: str


# Simulated transcription processor
def generate_transcription(audio_id: str, language: str) -> str:
    return f"Simulated transcription for audio {audio_id} in {language}"


@router.post("/")
async def transcribe_audio(req: TranscriptionRequest):
    # Check if file exists
    found = False
    file_name = None
    for root, _, files in os.walk(AUDIO_STORAGE):
        for f in files:
            if f.startswith(req.audio_id):
                found = True
                file_name = f
                break
    if not found:
        raise HTTPException(status_code=404, detail="Audio file not found")

    # Simulate transcription
    transcription_id = str(uuid.uuid4())
    transcript_text = generate_transcription(req.audio_id, req.language)

    # Save to in-memory DB
    TRANSCRIPT_DB[transcription_id] = {
        "transcription_id": transcription_id,
        "file_name": file_name,
        "language": req.language,
        "created_at": datetime.utcnow().isoformat(),
        "transcript": transcript_text
    }

    # TODO: Emit result to WebSocket channel
    # This requires a pub/sub mechanism or external notification setup

    return {
        "transcription_id": transcription_id,
        "transcript": transcript_text,
        "language": req.language
    }


@router.get("/")
async def list_transcriptions():
    return [
        {
            "transcription_id": t["transcription_id"],
            "file_name": t["file_name"],
            "language": t["language"],
            "created_at": t["created_at"]
        } for t in TRANSCRIPT_DB.values()
    ]
