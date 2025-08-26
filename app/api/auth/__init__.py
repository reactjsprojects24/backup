# Auth API Package
# Authentication API endpoints 

from fastapi import APIRouter, Body, HTTPException, Header, Request
from pydantic import BaseModel
from fastapi_users.schemas  import CreateUpdateDictModel

from streamlit import status

class Credentials(BaseModel):
    username: str
    password: str

class UserCreate(CreateUpdateDictModel):
    email : str
    password : str
    fullname: str
    organization: str
    designation: str
    confirm_password : str
    security_question: str
    security_answer: str


router = APIRouter()

# Login
@router.post('/login')
def login(credential: Credentials):
    
    if not credential.username or not credential.password:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "username and password required"
        )
    
    if credential.username == "user@gmail.com" and credential.password == "User@123":
        return {
            "access_token": "MNBFPObGnxoKjsUNoVTiK2PP7e7GoqpAFNLeTmnpn04",
            "token_type": "bearer",
            "access_token_time": 3600,
            "refresh_token": "iX6jEb0aIN7bzrWNYcO76enKs8EMhPm9PgWyUM7IPE8",
            "refresh_token_time": 7200
        }
    
    raise HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Invalid username or password"
    )

# Register
@router.post('/register')
def register(userdata: UserCreate):
    """Register a new user."""

    return {
        "message": "User registered successfully",
        "user": {
            "email": userdata.email,
            "fullname": userdata.fullname,
            "organization": userdata.organization,
            "designation": userdata.designation,
            "security_question": userdata.security_question,
            "security_answer": userdata.security_answer
        }
    }

# Forgot Password
@router.post('/forgot-password')
def forgot_password(
    email: str = Body(..., embed=True),
    security_question: str = Body(..., embed=True),
    security_answer: str = Body(..., embed=True),
    ):
    """Request a password reset email."""

    return{
        "reset_token": "skgfkjHFJFlkhuekgklkjgjkhk"
        }
    
    

# Reset Password
@router.post('/reset-password')
def reset_password(
    token: str = Body(...),
    password: str = Body(...),
    ):
    """Reset password using a token."""
    return {"message": "Password reset successful"}

# Get Current User
@router.post('/verify')
def get_current_user(authorization: str = Header(None)):
    """Get the current authenticated user's details."""
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    return {
    "message": "User authenticated",
    "user": {
        "id": "686ca463fad6c5d205efe818",
        "email": "user@gmail.com",
        "visited": 0,
        "fullname": "User",
        "role": "User",
        "is_active": True,
        "is_superuser": False,
        "is_verified": False,
        "organization": "string",
        "designation": "string"
    }
}



# Delete Current User
@router.post('/delete')
def refresh_token(
    refresh_token: str = Body(..., embed=True),
    ):
    """To get new access token."""
    
    return{
        "access_token": "4BhQ8C6rb7ccr2nQEgr-MplEWzw1VYGZcbg1QBvQzas",
        "token_type": "bearer",
        "access_token_time": 3600
    }

@router.post('/logout')
def logout(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    
    return {"message": "Logged out successfully"}
