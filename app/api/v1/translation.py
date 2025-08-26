from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, List
from datetime import datetime
import uuid
import os

router = APIRouter()

TRANSLATION_DB = []
AUDIO_STORAGE = "audio_storage"


# 5.4.1 Translate Text, File, or Audio Transcript
@router.post("/")
async def translate(
    text_file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    audio_id: Optional[str] = Form(None),
    language_from: str = Form(...),
    language_to: str = Form(...),
    model: str = Form(...)
):
    if not (text_file or text or audio_id):
        raise HTTPException(status_code=400, detail="Must provide at least one of text_file, text, or audio_id")

    input_text = ""

    # 1. Extract text from uploaded file
    if text_file:
        input_text = (await text_file.read()).decode("utf-8")

    # 2. Use direct string if provided
    elif text:
        input_text = text

    # 3. Use transcript from a given audio_id (dummy example here)
    elif audio_id:
        # Normally you'd query transcript DB
        input_text = f"Simulated transcript for audio_id {audio_id}"

    translated = f"[{language_from}→{language_to}] {input_text}"

    translation_id = str(uuid.uuid4())
    TRANSLATION_DB.append({
        "translation_id": translation_id,
        "file_name": text_file.filename if text_file else f"{audio_id or 'text'}.txt",
        "translated_text": translated,
        "language_from": language_from,
        "language_to": language_to,
        "duration": 12.5,
        "created_at": datetime.utcnow().isoformat()
    })

    # TODO: send to websocket clients (if needed)

    return {
        "translation_id": translation_id,
        "translated_text": translated,
        "language_from": language_from,
        "language_to": language_to
    }


# 5.4.2 Bulk Translate
@router.post("/bulk")
async def bulk_translate(folderPath: str = Form(...), model: str = Form(...)):
    folder_path = os.path.join(AUDIO_STORAGE, folderPath)
    if not os.path.isdir(folder_path):
        raise HTTPException(status_code=404, detail="Folder not found")

    # Simulated: Iterate and "translate" each file
    for file in os.listdir(folder_path):
        translation_id = str(uuid.uuid4())
        TRANSLATION_DB.append({
            "translation_id": translation_id,
            "file_name": file,
            "translated_text": f"Translated content for {file}",
            "language_from": "en",
            "language_to": "fr",
            "duration": 12.0,
            "created_at": datetime.utcnow().isoformat()
        })

        # TODO: Send progress update via WebSocket `/ws/translations`

    return {"status": "started", "message": "Bulk translation started."}


# 5.4.3 List All Translations
@router.get("/")
async def list_translations():
    return [
        {
            "translation_id": t["translation_id"],
            "file_name": t["file_name"],
            "language_from": t["language_from"],
            "language_to": t["language_to"],
            "duration": t["duration"],
            "created_at": t["created_at"]
        }
        for t in TRANSLATION_DB
    ]
