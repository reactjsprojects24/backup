from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import (
    audio,
    identification,
    transcription,
    translation,
    speakers,
    keywords,
    nlp,
    noise_removal
)
from app.api.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(audio.router, prefix="/api/audio", tags=["Audio"])
app.include_router(identification.router, prefix="/api/identification", tags=["Identification"])
app.include_router(transcription.router, prefix="/api/transcriptions", tags=["Transcription"])
app.include_router(translation.router, prefix="/api/translations", tags=["Translation"])
app.include_router(noise_removal.router, prefix="/api", tags=["NoiseRemoval"])
app.include_router(nlp.router, prefix="/api", tags=["NLP"])
app.include_router(speakers.router, prefix="/api/speakers", tags=["Speakers"])
app.include_router(keywords.router, prefix="/api", tags=["Keywords"])


@app.get("/")
async def root():
    return 
    {
        "message": "Mock API for AIVAS is running"
    }
