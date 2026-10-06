import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AppPreview.css";

const AppPreview = () => {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(1);

  /* ========================================
     SEASONAL DRINKS
  ======================================== */

  const seasonalDrinks = [
    {
      id: 0,
      label: "SEASONAL FAVOURITE",
      name: "card1",
      description: "Smooth espresso with a rich and refreshing finish.",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700",
    },
    {
      id: 1,
      label: "SEASONAL FAVOURITE",
      name: "card3",
      description: "Rich chocolate, espresso and a smooth finish.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700",
    },
    {
      id: 2,
      label: "SEASONAL FAVOURITE",
      name: "classic",
      description: "Bold coffee crafted for your perfect everyday cup.",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
    },
  ];

  /* ========================================
     MENU CATEGORIES
  ======================================== */

  const menuCategories = [
    {
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      name: "Coffee",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300",
      name: "Coffee",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300",
      name: "Coffee",
    },
    {
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300",
      name: "Coffee",
    },
  ];

  /* ========================================
     MOVE CAROUSEL
  ======================================== */

  const previousSlide = () => {
    setActiveSlide(
      (previous) =>
        (previous - 1 + seasonalDrinks.length) % seasonalDrinks.length,
    );
  };

  const nextSlide = () => {
    setActiveSlide((previous) => (previous + 1) % seasonalDrinks.length);
  };

  return (
    <main className="app-preview-page">
      {/* ========================================
          HERO
      ======================================== */}

      <section className="preview-hero">
        {/* HEADER */}

        <header className="preview-header">
          <div className="preview-brand">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico Coffee"
              className="preview-brand-logo"
            />

            <div className="preview-brand-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>

          <button
            type="button"
            className="preview-menu-button"
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        {/* HERO CONTENT */}

        <div className="preview-hero-content">
          <span className="preview-eyebrow">THE LUDOVICO APP</span>

          <h2>
            Coffee,
            <br />
            reimagined.
          </h2>

          <p>
            Order from the Ludovico app. Your coffee is prepared automatically
            and ready within no time.
          </p>
        </div>

        {/* ========================================
            PHONE MOCKUP
        ======================================== */}

        <div className="phone-preview">
          <div className="phone-screen">
            {/* PHONE STATUS BAR */}

            <div className="phone-status-bar">
              <span>9:41</span>

              <div className="phone-status-icons">
                <span>●●●</span>
                <span>▰</span>
              </div>
            </div>

            {/* APP HEADER */}

            <div className="phone-app-header">
              <div className="phone-brand">
                <img src="/ludovico-logo.jpeg" alt="Ludovico" />

                <div>
                  <strong>LUDOVICO</strong>
                  <small>COFFEE</small>
                </div>
              </div>

              <div className="phone-actions">
                <button type="button">♧</button>
                <button type="button">G</button>
              </div>
            </div>

            {/* APP CONTENT */}

            <div className="phone-content">
              {/* GREETING */}

              <h3>Need a little reset, Raj?</h3>

              <p className="phone-greeting">Find your next cup.</p>

              {/* SEARCH + HOT COLD */}

              <div className="phone-search-row">
                <div className="phone-search">
                  <span>⌕</span>
                  <span>Search “ice latte”</span>
                </div>

                <div className="phone-hot-cold">
                  <button type="button" className="active">
                    HOT
                  </button>

                  <button type="button">COLD</button>
                </div>
              </div>

              {/* NEARBY STATION */}

              <div className="phone-station">
                <div className="phone-map">
                  <div className="map-line map-line-one" />
                  <div className="map-line map-line-two" />
                  <div className="map-line map-line-three" />

                  <div className="map-pin">●</div>
                </div>

                <div className="station-info">
                  <small>Nearest to you</small>

                  <strong>Ludovico Coffee Station</strong>

                  <span>DLF CyberHub, Gurugram</span>

                  <span>0.8 km away</span>

                  <button type="button">View Directions</button>
                </div>
              </div>

              {/* EXPLORE MENU */}

              <div className="phone-menu-title">
                <div>
                  <strong>Explore the menu</strong>

                  <small>Based on your recent orders</small>
                </div>

                <span>See all</span>
              </div>

              {/* CATEGORIES */}

              <div className="phone-categories">
                {menuCategories.map((category, index) => (
                  <div className="phone-category" key={index}>
                    <img src={category.image} alt="" />

                    <span>{category.name}</span>
                  </div>
                ))}
              </div>

              {/* ========================================
                  SEASONAL CAROUSEL
              ======================================== */}

              <div className="phone-carousel">
                <div
                  className="phone-carousel-track"
                  style={{
                    transform: `translateX(-${activeSlide * 96}%)`,
                  }}
                >
                  {seasonalDrinks.map((drink) => (
                    <article
                      className={`phone-season-card ${
                        drink.id === activeSlide ? "active" : ""
                      }`}
                      key={drink.id}
                    >
                      <img src={drink.image} alt={drink.name} />

                      <div className="season-card-content">
                        <span>{drink.label}</span>

                        <h4>{drink.name}</h4>

                        <p>{drink.description}</p>

                        <button type="button">Order now</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* CAROUSEL CONTROLS */}

              <div className="phone-carousel-controls">
                <button
                  type="button"
                  aria-label="Previous drink"
                  onClick={previousSlide}
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Next drink"
                  onClick={nextSlide}
                >
                  ›
                </button>
              </div>

              {/* MADE FOR YOU */}

              <div className="phone-made-title">
                <div>
                  <strong>Made for you</strong>

                  <small>Based on your recent orders</small>
                </div>

                <span>See all</span>
              </div>

              <div className="phone-made-grid">
                <img
                  src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=400"
                  alt=""
                />

                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* VISIT APP */}

        <button
          type="button"
          className="preview-visit-button"
          onClick={() => navigate("/home")}
        >
          Visit the App
          <span>→</span>
        </button>
      </section>

      {/* ========================================
          ABOUT LUDOVICO
      ======================================== */}

      <section className="preview-about" id="about">
        <div className="preview-section-heading">
          <span className="preview-eyebrow">ABOUT LUDOVICO</span>

          <h2>
            Coffee,
            <br />
            reimagined.
          </h2>

          <p>
            Order from the Ludovico app. Your coffee is prepared automatically
            and ready within no time.
          </p>
        </div>

        {/* FEATURES */}

        <div className="preview-feature-list">
          <article className="preview-feature-card">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000"
              alt="Coffee preparation"
            />

            <div className="preview-feature-content">
              <span>01</span>

              <h3>Smarter Ordering</h3>

              <p>
                Order your coffee through the Ludovico app — no queues, no
                waiting.
              </p>
            </div>
          </article>

          <article className="preview-feature-card">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000"
              alt="Ludovico coffee"
            />

            <div className="preview-feature-content">
              <span>02</span>

              <h3>Made for You</h3>

              <p>
                Your favourite coffee, prepared exactly the way you like it.
              </p>
            </div>
          </article>

          <article className="preview-feature-card">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000"
              alt="Coffee"
            />

            <div className="preview-feature-content">
              <span>03</span>

              <h3>Ready When You Are</h3>

              <p>
                Automated preparation means your order is ready when you arrive.
              </p>
            </div>
          </article>
        </div>

        <button type="button" className="preview-secondary-button">
          More About LUDOVICO
          <span>→</span>
        </button>
      </section>

      {/* ========================================
          OPPORTUNITIES
      ======================================== */}

      <section className="preview-opportunities" id="opportunities">
        <div className="preview-section-heading">
          <span className="preview-eyebrow">OPPORTUNITIES</span>

          <h2>
            Be a part of
            <br />
            what’s next
          </h2>

          <p>
            Join the people building a smarter, more accessible future for
            coffee.
          </p>
        </div>

        {/* FRANCHISE */}

        <article className="opportunity-card" id="franchise">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1000"
            alt="Coffee shop"
          />

          <div className="opportunity-content">
            <span>FRANCHISE</span>

            <h3>
              Build your own
              <br />
              Ludovico.
            </h3>

            <p>
              Launch a technology-enabled coffee business designed for modern,
              high-footfall spaces — with automated preparation and a proven
              digital model behind you.
            </p>

            <button type="button">
              Explore Franchise
              <span>→</span>
            </button>
          </div>
        </article>

        {/* CAREERS */}

        <article className="opportunity-card" id="careers">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1000"
            alt="Ludovico coffee shop"
          />

          <div className="opportunity-content">
            <span>CAREERS</span>

            <h3>Join the team.</h3>

            <p>
              Shape Ludovico's technology, operations, marketing and growth
              alongside a team rethinking how coffee reaches people.
            </p>

            <button type="button">
              View Open Roles
              <span>→</span>
            </button>
          </div>
        </article>
      </section>

      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="preview-footer">
        <div className="preview-footer-inner">
          {/* BRAND */}

          <div className="preview-footer-brand">
            <img src="/ludovico-logo.jpeg" alt="Ludovico Coffee" />

            <div>
              <strong>LUDOVICO</strong>
              <small>COFFEE</small>
            </div>
          </div>

          <p className="preview-footer-description">
            Digital ordering and automated preparation, engineered into a
            smarter coffee experience ready whenever you are.
          </p>

          {/* LINKS */}

          <div className="preview-footer-links">
            <div>
              <span>EXPLORE</span>

              <a href="/home">App</a>
              <a href="#about">About</a>
              <a href="#franchise">Franchise</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>

            <div>
              <span>FOLLOW</span>

              <a href="#instagram">Instagram</a>

              <a href="#linkedin">LinkedIn</a>

              <a href="#x">X</a>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="preview-footer-bottom">
            <span>© 2026 Ludovico Coffee. All rights reserved.</span>

            <div>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default AppPreview;
