import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/home");
  };

  return (
    <main className="welcome-page">
      <div className="welcome-container">
        {/* Header */}

        <header className="welcome-header">
          <button
            type="button"
            className="welcome-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={21} strokeWidth={1.7} />
          </button>

          <div className="welcome-logo">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico logo"
              className="welcome-logo-mark"
            />

            <div className="welcome-logo-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>
        </header>

        {/* Welcome Content */}

        <section className="welcome-content">
          <h2>You're all set!</h2>

          <p className="welcome-description">
            Great coffee is now
            <br />
            just a tap away.
          </p>

          {/* Robot */}

          <div className="welcome-robot-container">
            <img
              src="/welcome-robot.png"
              alt="Ludovico Coffee robot"
              className="welcome-robot"
            />
          </div>

          {/* Explore */}

          <button
            type="button"
            className="explore-button"
            onClick={handleExplore}
          >
            Explore the App
          </button>
        </section>
      </div>
    </main>
  );
};

export default Welcome;
