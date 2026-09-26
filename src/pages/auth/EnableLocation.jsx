import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock3, Navigation } from "lucide-react";

import "./EnableLocation.css";

const EnableLocation = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     GO TO NEXT PAGE
  ========================= */

  const goToNextPage = () => {
    navigate("/welcome");
  };

  /* =========================
     SAVE LOCATION
  ========================= */

  const saveLocationAndContinue = async (position) => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };

    localStorage.setItem("userLocation", JSON.stringify(location));

    goToNextPage();
  };

  /* =========================
     REQUEST LOCATION
  ========================= */

  const requestLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Location services are not supported on this device.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await saveLocationAndContinue(position);
        setLoading(false);
      },
      (error) => {
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError(
            "Location access was denied. Please allow location access in your browser settings.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError("Your location is currently unavailable.");
        } else if (error.code === error.TIMEOUT) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  /* =========================
     BACK BUTTON
  ========================= */

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="location-page">
      <div className="location-container">
        {/* =========================
            HEADER
        ========================= */}

        <header className="location-header">
          <button
            className="location-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={21} strokeWidth={1.7} />
          </button>

          <div className="location-logo">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico logo"
              className="location-logo-mark"
            />

            <div className="location-logo-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>

          <div className="location-header-spacer" />
        </header>

        {/* =========================
            CONTENT
        ========================= */}

        <section className="location-content">
          <h2>Enable Location</h2>

          <p className="location-subtitle">
            Find nearby stations and get
            <br />
            real-time updates on your order.
          </p>

          {/* =========================
              MAP
          ========================= */}

          <div className="location-map">
            <div className="map-road map-road-1" />
            <div className="map-road map-road-2" />
            <div className="map-road map-road-3" />
            <div className="map-road map-road-4" />
            <div className="map-road map-road-5" />
            <div className="map-road map-road-6" />

            <div className="location-ripple ripple-one" />
            <div className="location-ripple ripple-two" />
            <div className="location-ripple ripple-three" />

            <div className="location-pin">
              <MapPin size={30} fill="currentColor" strokeWidth={2} />
            </div>
          </div>

          {/* =========================
              BENEFITS
          ========================= */}

          <div className="location-benefits">
            <div className="location-benefit">
              <div className="benefit-icon">
                <MapPin size={16} strokeWidth={2} />
              </div>

              <span>Find the nearest Ludovico stations</span>
            </div>

            <div className="location-benefit">
              <div className="benefit-icon">
                <Clock3 size={16} strokeWidth={2} />
              </div>

              <span>Check real-time availability</span>
            </div>

            <div className="location-benefit">
              <div className="benefit-icon">
                <Navigation size={16} strokeWidth={2} />
              </div>

              <span>Get directions</span>
            </div>
          </div>

          {/* =========================
              ERROR
          ========================= */}

          {error && <p className="location-error">{error}</p>}

          {/* =========================
              ACTIONS
          ========================= */}

          <div className="location-actions">
            <button
              className="enable-location-button"
              onClick={requestLocation}
              disabled={loading}
            >
              {loading ? "Getting location..." : "Enable Location"}
            </button>

            <button
              className="not-now-button"
              onClick={goToNextPage}
              disabled={loading}
            >
              Not Now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EnableLocation;
