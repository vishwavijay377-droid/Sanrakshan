import { useEffect, useState } from "react";
import { getAssessmentHistory } from "../services/api";

function AssessmentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getAssessmentHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load assessment history.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <section className="history-container">
      <h2>Assessment History</h2>

      {loading && <p>Loading history...</p>}

      {error && <p className="error-box">{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p>No previous assessments found.</p>
      )}

      {!loading && !error && history.length > 0 && (
        <div className="history-list">
          {history.map((assessment) => (
            <div className="history-card" key={assessment.id}>
              <div className="history-header">
                <h3>Assessment #{assessment.id}</h3>

                <span>
                  {new Date(assessment.created_at).toLocaleString()}
                </span>
              </div>

              <p>
                <strong>Symptoms:</strong>{" "}
                {assessment.symptoms}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {assessment.duration}
              </p>

              <p>
                <strong>Severity:</strong>{" "}
                {assessment.severity}
              </p>

              <p>
                <strong>Possible Conditions:</strong>{" "}
                {assessment.possible_conditions}
              </p>

              <p>
                <strong>Suggested Doctor:</strong>{" "}
                {assessment.doctor_specialty}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AssessmentHistory;