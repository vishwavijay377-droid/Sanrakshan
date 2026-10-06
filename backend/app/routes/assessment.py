from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Assessment, User
from app.routes.auth import get_current_user
from app.schemas import SymptomRequest
from app.services.ai_service import analyze_symptoms


router = APIRouter(
    prefix="/api/assessment",
    tags=["Assessment"],
)


@router.post("/")
def create_assessment(
    data: SymptomRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = analyze_symptoms(data)

    assessment = Assessment(
        user_id=current_user.id,
        age=data.age,
        gender=data.gender,
        symptoms=data.symptoms,
        duration=data.duration,
        severity=data.severity,
        medical_history=data.medical_history,
        medications=data.medications,
        possible_conditions=" | ".join(
            result.get("possible_conditions", [])
        ),
        recommendations=" | ".join(
            result.get("recommendations", [])
        ),
        exercise=" | ".join(
            result.get("exercise", [])
        ),
        doctor_specialty=result.get(
            "doctor_specialty",
            "",
        ),
        warning_signs=" | ".join(
            result.get("warning_signs", [])
        ),
        disclaimer=result.get(
            "disclaimer",
            "",
        ),
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return {
        **result,
        "assessment_id": assessment.id,
        "created_at": assessment.created_at,
    }


@router.get("/history")
def get_assessment_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assessments = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == current_user.id
        )
        .order_by(
            Assessment.created_at.desc()
        )
        .all()
    )

    return [
        {
            "id": assessment.id,
            "age": assessment.age,
            "gender": assessment.gender,
            "symptoms": assessment.symptoms,
            "duration": assessment.duration,
            "severity": assessment.severity,
            "possible_conditions": assessment.possible_conditions,
            "doctor_specialty": assessment.doctor_specialty,
            "created_at": assessment.created_at,
        }
        for assessment in assessments
    ]