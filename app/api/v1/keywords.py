from fastapi import APIRouter, HTTPException, Body, Response
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
from fastapi.responses import JSONResponse

router = APIRouter()
# Simulated in-memory stores
KEYWORD_GROUPS = {}
TRANSLATION_DB = []  # shared from translations module if needed

# --------------------
# Models
# --------------------
class KeywordGroupRequest(BaseModel):
    group_name: str

class KeywordRequest(BaseModel):
    keyword: str
    synonyms: Optional[List[str]] = []

class KeywordSpottingRequest(BaseModel):
    keywords: List[str]
    case_sensitive: Optional[bool] = False
    whole_word: Optional[bool] = False
    synonyms: Optional[Dict[str, List[str]]] = {}
    model: Optional[str] = None

# --------------------
# Endpoints
# --------------------
# 5.6.1 Create Keyword Group
@router.post("/keyword-groups")
async def create_keyword_group(req: KeywordGroupRequest):
    group_id = str(uuid.uuid4())
    KEYWORD_GROUPS[group_id] = {
        "group_name": req.group_name,
        "keywords": []
    }
    return {"group_id": group_id, "status": "success"}

# 5.6.2 Add Keyword to Group
@router.post("/keyword-groups/{group_id}/keywords")
async def add_keyword_to_group(group_id: str, req: KeywordRequest):
    if group_id not in KEYWORD_GROUPS:
        raise HTTPException(status_code=404, detail="Group not found")
    keyword_id = str(uuid.uuid4())
    KEYWORD_GROUPS[group_id]["keywords"].append({
        "keyword_id": keyword_id,
        "keyword": req.keyword,
        "synonyms": req.synonyms or []
    })
    return {"keyword_id": keyword_id, "status": "success"}

# 5.6.3 Get Keywords in Group
@router.get("/keyword-groups/{group_id}/keywords")
async def get_keywords_in_group(group_id: str):
    if group_id not in KEYWORD_GROUPS:
        raise HTTPException(status_code=404, detail="Group not found")
    return KEYWORD_GROUPS[group_id]["keywords"]

from typing import List  # Import the List type


@router.post('/keyword-spotting')
async def keyword_spotting(
    keywords: List[str] = Body(..., embed=True),  # Changed to List[str]
    case_sensitive: str = Body(..., embed=True),
    whole_word: str = Body(..., embed=True),
    synonyms: str = Body(..., embed=True),
    model: str = Body(..., embed=True)
):
    if not keywords:
        return JSONResponse(
            status_code=400,
            content={"error": "Keywords are required"}
        )
    # Dummy keyword spotting result
    dummy_files = ["text1.txt", "text2.txt"]
    results = []
    for file in dummy_files:
        found = [kw for kw in keywords if kw in ["keyword1", "keyword2", "keyword3"]]
        results.append({
            "file_name": file,
            "found_keywords": found
        })
    return JSONResponse(content={"results": results})
    