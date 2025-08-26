from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import HTTPException
import os

router = APIRouter()

AUDIO_STORAGE = "audio_storage"


class NoiseRemovalRequest(BaseModel):
    audio_id: str
    model: str


@router.post("/noise-removal")
async def remove_noise(req: NoiseRemovalRequest):
    # Simulate checking audio_id exists
    found_file = None
    for root, _, files in os.walk(AUDIO_STORAGE):
        for file in files:
            if file.startswith(req.audio_id):
                found_file = file
                break

    if not found_file:
        raise HTTPException(status_code=404, detail="Audio file not found")

    return {
        "status": "success",
        "processed_file_url": f"/processed/{found_file}"
    }
