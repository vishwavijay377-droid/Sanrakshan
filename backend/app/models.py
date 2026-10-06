from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, Text

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(Text, nullable=False)
    email = Column(Text, unique=True, index=True, nullable=False)
    password_hash = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)

    age = Column(Integer, nullable=False)
    gender = Column(Text, nullable=False)
    symptoms = Column(Text, nullable=False)
    duration = Column(Text, nullable=False)
    severity = Column(Text, nullable=False)

    medical_history = Column(Text, nullable=True)
    medications = Column(Text, nullable=True)

    possible_conditions = Column(Text, nullable=False)
    recommendations = Column(Text, nullable=False)
    exercise = Column(Text, nullable=False)
    doctor_specialty = Column(Text, nullable=False)
    warning_signs = Column(Text, nullable=False)
    disclaimer = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )