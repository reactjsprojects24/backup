from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import random

router = APIRouter()


# --------------------
# Models
# --------------------
class TextInput(BaseModel):
    text: str


# --------------------
# Endpoints
# --------------------

# 5.7.1 Grammar Correction
@router.post("/nlp/grammar-correction")
async def grammar_correction(input: TextInput):
    # Simulated correction (capitalize, add punctuation)
    corrected = input.text.strip().capitalize()
    if not corrected.endswith("."):
        corrected += "."
    return {"corrected_text": corrected}


# 5.7.2 Sentiment Analysis
@router.post("/nlp/sentiment-analysis")
async def sentiment_analysis(input: TextInput):
    sentiments = ["positive", "negative", "neutral"]
    sentiment = random.choice(sentiments)
    score = round(random.uniform(0.7, 1.0), 2)
    return {"sentiment": sentiment, "score": score}


# 5.7.3 Entity Extraction
@router.post("/nlp/entity-extraction")
async def entity_extraction(input: TextInput):
    # Simulated basic entity detection (not accurate, for demo only)
    sample_entities = [
        {"entity": "John Doe", "type": "PERSON"},
        {"entity": "New York", "type": "LOCATION"},
        {"entity": "OpenAI", "type": "ORG"},
    ]
    return {"entities": sample_entities}

