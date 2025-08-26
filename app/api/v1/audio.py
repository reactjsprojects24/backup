from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import os
import shutil
import uuid

router = APIRouter()

AUDIO_STORAGE = "audio_storage"


# Utils
def save_file(file: UploadFile, folder: str) -> str:
    os.makedirs(os.path.join(AUDIO_STORAGE, folder), exist_ok=True)
    file_id = str(uuid.uuid4())
    file_path = os.path.join(AUDIO_STORAGE, folder, f"{file_id}_{file.filename}")
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return file_id, file.filename, folder


@router.post("/upload")
async def upload_audio(audio_file: UploadFile = File(...)):
    audio_id, file_name, folder = save_file(audio_file, "default")
    return {"audio_id": audio_id, "file_name": file_name, "status": "uploaded"}


@router.post("/upload-folder")
async def upload_folder(files: List[UploadFile] = File(...)):
    print(f"Received files: {files}")
    folder_name = f"folder_{uuid.uuid4().hex[:6]}"
    audio_ids = []
    for file in files:
        audio_id, _, _ = save_file(file, folder_name)
        audio_ids.append(audio_id)
    return {"folder_name": folder_name, "audio_ids": audio_ids, "status": "uploaded"}


@router.get("/files")
async def list_files():
    result = []
    for root, _, files in os.walk(AUDIO_STORAGE):
        folder = os.path.basename(root)
        for file in files:
            audio_id = file.split("_")[0]
            result.append({"audio_id": audio_id, "file_name": file, "folder": folder})
    return result


@router.get("/files/folders")
async def list_files_by_folder():
    grouped = []
    for folder in os.listdir(AUDIO_STORAGE):
        folder_path = os.path.join(AUDIO_STORAGE, folder)
        if os.path.isdir(folder_path):
            files = []
            for file in os.listdir(folder_path):
                audio_id = file.split("_")[0]
                files.append({"audio_id": audio_id, "file_name": file})
            grouped.append({"folder": folder, "files": files})
    return grouped


@router.delete("/files/{audio_id}")
async def delete_audio(audio_id: str):
    for root, _, files in os.walk(AUDIO_STORAGE):
        for file in files:
            if file.startswith(audio_id):
                os.remove(os.path.join(root, file))
                return {"status": "success", "audio_id": audio_id}
    raise HTTPException(status_code=404, detail="File not found")


@router.delete("/folders/{folder_name}")
async def delete_folder(folder_name: str):
    folder_path = os.path.join(AUDIO_STORAGE, folder_name)
    if os.path.isdir(folder_path):
        shutil.rmtree(folder_path)
        return {"status": "success", "folder": folder_name}
    raise HTTPException(status_code=404, detail="Folder not found")


@router.get("/metadata/{audio_id}")
async def get_metadata(audio_id: str):
    # Simulated metadata response (replace with real audio processing later)
    for root, _, files in os.walk(AUDIO_STORAGE):
        for file in files:
            if file.startswith(audio_id):
                return {
                    "audio_id": audio_id,
                    "file_name": file,
                    "duration": "1m 39s",
                    "bitrate": "1,411kbps",
                    "channels": "Stereo",
                    "samplerate": "48000Hz",
                    "size": "15MB",
                    "codec": "pcm_s16le"
                }
    raise HTTPException(status_code=404, detail="Audio file not found")
