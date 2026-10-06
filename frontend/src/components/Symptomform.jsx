import { useState } from "react";
import { analyzeSymptoms } from "../services/api";

function SymptomForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: "",
    duration: "",
    severity: "",
    medical_history: "",
    medications: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeSymptoms(formData);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the healthcare server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-container">
      <h2>Health Assessment</h2>

      <p>
        Enter your symptoms and basic health information for an
        educational health assessment.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="1"
          max="120"
          required
        />

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">
            Prefer not to say
          </option>
        </select>

        <label>Symptoms</label>
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Describe your symptoms..."
          rows="5"
          required
        />

        <label>How long have you had these symptoms?</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Example: 2 days"
          required
        />

        <label>Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
        >
          <option value="">Select severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>

        <label>Medical History</label>
        <textarea
          name="medical_history"
          value={formData.medical_history}
          onChange={handleChange}
          placeholder="Optional"
          rows="3"
        />

        <label>Current Medications</label>
        <textarea
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          placeholder="Optional"
          rows="3"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>
      </form>

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="results">
          <h2>Assessment Results</h2>

          <section>
            <h3>Possible Conditions</h3>
            <ul>
              {result.possible_conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Recommendations</h3>
            <ul>
              {result.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Exercise Guidance</h3>
            <ul>
              {result.exercise.length > 0 ? (
                result.exercise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No specific exercise guidance available.</li>
              )}
            </ul>
          </section>

          <section>
            <h3>Suggested Doctor</h3>
            <p>{result.doctor_specialty}</p>
          </section>

          <section>
            <h3>Warning Signs</h3>
            <ul>
              {result.warning_signs.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </section>

          <div className="disclaimer-box">
            <strong>Important:</strong> {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;