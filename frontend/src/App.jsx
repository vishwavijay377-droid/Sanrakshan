import { useState } from "react";

import SymptomForm from "./components/SymptomForm";
import AssessmentHistory from "./components/AssessmentHistory";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("sanrakshan_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("sanrakshan_token");
    localStorage.removeItem("sanrakshan_user");

    setUser(null);
  };

  if (!user) {
    return (
      <div className="app">
        <header className="hero">
          <div className="hero-content">
            <div className="brand">
              <div className="brand-icon">✚</div>

              <div>
                <h1>Sanrakshan</h1>
                <p>AI Healthcare Assistant</p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Login onLogin={handleLogin} />
        </main>

        <footer>
          <p>
            Sanrakshan provides educational health information
            and does not replace professional medical advice.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="brand">
            <div className="brand-icon">✚</div>

            <div>
              <h1>Sanrakshan</h1>
              <p>AI Healthcare Assistant</p>
            </div>
          </div>

          <div className="hero-text">
            <h2>
              Understand your symptoms.
              <br />
              Make informed health decisions.
            </h2>

            <p>
              Enter your symptoms and basic health information
              to receive educational guidance and suggested next
              steps.
            </p>

            <button
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <SymptomForm />
        <AssessmentHistory />
      </main>

      <footer>
        <p>
          Sanrakshan provides educational health information
          and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;