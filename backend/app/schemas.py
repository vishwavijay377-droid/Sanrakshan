from typing import Optional

from pydantic import BaseModel, EmailStr


class SymptomRequest(BaseModel):
    age: int
    gender: str
    symptoms: str
    duration: str
    severity: str
    medical_history: Optional[str] = None
    medications: Optional[str] = None


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    
    
class UserLogin(BaseModel):
     email: EmailStr
     password: str