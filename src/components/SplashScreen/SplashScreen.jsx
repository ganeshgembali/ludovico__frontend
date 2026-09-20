import { useCallback, useEffect, useRef } from "react";
import LogoMark from "./LogoMark";
import "./SplashScreen.css";

const TIMELINE_SCALE = 1;
const TOTAL_SECONDS = 4.8;

const RESPECT_REDUCED_MOTION = true;

function prefersReducedMotion() {
  return (
    RESPECT_REDUCED_MOTION &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  );
}

export default function SplashScreen({ onComplete }) {
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;

    finished.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      finish();
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("keydown", onKeyDown);

    const safety = setTimeout(
      finish,
      (TOTAL_SECONDS * TIMELINE_SCALE + 1.5) * 1000,
    );

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(safety);
    };
  }, [finish]);

  return (
    <div
      className="splash"
      style={{ "--s": TIMELINE_SCALE }}
      role="status"
      aria-label="Loading Ludovico Coffee"
      onClick={finish}
    >
      <div className="splash__stage">

        {/* =========================
            KNIGHT
        ========================= */}

        <div className="splash__logo">
          <LogoMark className="splash__mark" />
        </div>

        {/* =========================
            TEXT
        ========================= */}

        <p className="splash__title">
          LUDOVICO COFFEE
        </p>

        <p className="splash__tagline">
          &quot; The Essences of Resilience &quot;
        </p>

      </div>

      {/* =========================
          LOADER
      ========================= */}

      <div className="splash__loader">
        <div className="splash__fill">
          <span className="splash__line" />
          <LogoMark className="splash__knight" />
        </div>
      </div>

      {/* =========================
          FINAL REVEAL
      ========================= */}

      <div
        className="splash__reveal"
        onAnimationEnd={finish}
      />
    </div>
  );
}