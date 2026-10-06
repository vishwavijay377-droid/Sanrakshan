from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import Assessment, User
from app.routes.assessment import router as assessment_router
from app.routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Sanrakshan API",
    description="AI Healthcare Assistant API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Sanrakshan API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(assessment_router)
app.include_router(auth_router)