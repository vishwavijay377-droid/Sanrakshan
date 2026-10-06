def analyze_symptoms(data):
    symptoms = data.symptoms.lower()
    emergency_keywords = [
        "difficulty breathing",
        "can't breathe",
        "cannot breathe",
        "severe chest pain",
        "chest pain",
        "unconscious",
        "loss of consciousness",
        "stroke",
        "seizure",
        "severe bleeding",
        "heavy bleeding",
        "suicidal",
    ]

    emergency_detected = any(
        keyword in symptoms
        for keyword in emergency_keywords
    )

    if emergency_detected:
        return {
            "emergency": True,
            "possible_conditions": [],
            "recommendations": [
                "Seek urgent medical attention immediately.",
                "Contact your local emergency service or go to the nearest emergency department.",
                "Do not rely on this application for emergency medical care.",
            ],
            "exercise": [],
            "doctor_specialty": "Emergency Medical Care",
            "warning_signs": [
                "Your symptoms may require immediate professional evaluation."
            ],
            "disclaimer": (
                "This application cannot diagnose or manage medical emergencies."
            ),
        }

    possible_conditions = []
    recommendations = []
    exercises = []

    if "fever" in symptoms and "cough" in symptoms:
        possible_conditions.append("Respiratory infection")
        recommendations.append(
            "Rest and maintain adequate hydration."
        )
        recommendations.append(
            "Monitor your temperature and symptoms."
        )
        exercises.append(
            "Avoid strenuous exercise while experiencing fever."
        )

    if "headache" in symptoms:
        possible_conditions.append(
            "Tension headache or another headache-related condition"
        )
        recommendations.append(
            "Rest in a quiet environment."
        )
        exercises.append(
            "Gentle stretching may be appropriate if it does not worsen symptoms."
        )

    if "stomach pain" in symptoms:
        possible_conditions.append(
            "A gastrointestinal condition"
        )
        recommendations.append(
            "Stay hydrated and monitor your symptoms."
        )

    if not possible_conditions:
        possible_conditions.append(
            "The symptoms require further evaluation by a healthcare professional."
        )

    warning_signs = [
        "Difficulty breathing",
        "Severe chest pain",
        "Loss of consciousness",
        "Severe dehydration",
        "Sudden severe symptoms",
    ]

    return {
        "possible_conditions": possible_conditions,
        "recommendations": recommendations,
        "exercise": exercises,
        "doctor_specialty": "General Physician",
        "warning_signs": warning_signs,
        "disclaimer": (
            "This information is for educational purposes only "
            "and is not a medical diagnosis."
        ),
    }