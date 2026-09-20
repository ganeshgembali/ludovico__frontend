import { useEffect } from "react";

import "./WelcomeTransition.css";

const WelcomeTransition = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1250);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="welcome-transition">
      <div className="welcome-transition-brand">
        <img
          src="/ludovico-logo.jpeg"
          alt=""
          className="welcome-transition-logo"
        />

        <h1 className="welcome-transition-title">Ludovico Coffee</h1>
      </div>
    </div>
  );
};

export default WelcomeTransition;
