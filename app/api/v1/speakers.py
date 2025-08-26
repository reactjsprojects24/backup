from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
import os
import uuid
import shutil

router = APIRouter()

SPEAKER_STORAGE = "speaker_data"
SPEAKER_DB = {}
AUDIO_STORAGE = "audio_storage"


# 5.5.1 Enroll Speakers
@router.post("/")
async def enroll_speakers(
    audio_file: List[UploadFile] = File(...),
    speaker_name: str = Form(...),
    model: str = Form(...)
):
    speaker_id = str(uuid.uuid4())
    folder = os.path.join(SPEAKER_STORAGE, speaker_id)
    os.makedirs(folder, exist_ok=True)

    filenames = []
    for file in audio_file:
        path = os.path.join(folder, file.filename)
        with open(path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        filenames.append(file.filename)

    SPEAKER_DB[speaker_id] = {
        "speaker_name": speaker_name,
        "audio_files": filenames
    }

    return {"status": "success", "speaker_id": speaker_id}


# 5.5.2 List Speakers
@router.get("/")
async def list_speakers():
    return [
        {
            "speaker_id": sid,
            "speaker_name": data["speaker_name"],
            "audio_files": data["audio_files"]
        } for sid, data in SPEAKER_DB.items()
    ]


# 5.5.3 Delete Speaker
@router.delete("/{speaker_id}")
async def delete_speaker(speaker_id: str):
    folder = os.path.join(SPEAKER_STORAGE, speaker_id)
    if os.path.isdir(folder):
        shutil.rmtree(folder)
        SPEAKER_DB.pop(speaker_id, None)
        return {"status": "success"}
    raise HTTPException(status_code=404, detail="Speaker not found")


# 5.5.4 Identify Speaker
@router.post("/identify")
async def identify_speaker(
    audio_file: UploadFile = File(...),
    model: str = Form(...)
):
    # Simulated match
    return {"identified_speaker": "John Doe", "confidence": 0.98}


# 5.5.5 Diarize Speaker
@router.post("/diarize")
async def diarize_speakers(
    audio_file: UploadFile = File(...),
    model: str = Form(...)
):
    return {
        "segments": [
            {"speaker": "John Doe", "start": 0, "end": 10},
            {"speaker": "Jane Smith", "start": 10, "end": 20}
        ]
    }
