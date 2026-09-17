import { useNavigate } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  QrCode,
  ShoppingCart,
  Gift,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Tag,
  Grid2X2,
  UserRound,
  MapPin,
} from "lucide-react";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  /* ========================================
     COLLECTIONS
  ======================================== */

  const collections = [
    {
      id: 1,
      name: "Masala Tea",
      type: "Tea",
      image:
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500",
    },
    {
      id: 2,
      name: "Ice Tea",
      type: "Tea",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    },
    {
      id: 3,
      name: "Cold Coffee",
      type: "Coffee",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    },
    {
      id: 4,
      name: "Classic",
      type: "Special",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    },
  ];

  /* ========================================
     BEST SELLERS
  ======================================== */

  const bestSellers = [
    {
      id: 1,
      name: "Espresso",
      image:
        "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500",
    },
    {
      id: 2,
      name: "Café Latte",
      image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500",
    },
    {
      id: 3,
      name: "Cappuccino",
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500",
    },
    {
      id: 4,
      name: "Americano",
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500",
    },
  ];

  return (
    <main className="home-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <header className="home-header">
        <div className="home-brand">
          <img
            src="/ludovico-logo.jpeg"
            alt="Ludovico"
            className="home-logo-mark"
          />

          <h1>Ludovico Coffee</h1>
        </div>
      </header>

      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <div className="home-content">
        {/* ========================================
            SEARCH
        ======================================== */}

        <div className="home-search">
          <Search size={18} strokeWidth={1.6} />

          <input type="text" placeholder="Search your favourite beverage..." />

          <button type="button" aria-label="Filter">
            <SlidersHorizontal size={18} strokeWidth={1.6} />
          </button>
        </div>

        {/* ========================================
            QUICK ACTIONS
        ======================================== */}

        <div className="quick-actions">
          <button type="button">
            <QrCode size={18} strokeWidth={1.7} />

            <span>Scanner</span>
          </button>

          <button type="button">
            <ShoppingCart size={20} strokeWidth={1.7} />

            <span>My Orders</span>
          </button>

          <button type="button">
            <Gift size={19} strokeWidth={1.7} />

            <span>Rewards</span>
          </button>
        </div>

        {/* ========================================
            FIND A LUDOVICO
        ======================================== */}

        <section className="nearby-section">
          <div className="nearby-card">
            <div className="nearby-overlay" />

            <div className="nearby-logo">
              <img src="/ludovico-logo.jpeg" alt="" />
            </div>

            <div className="nearby-map-pin">
              <MapPin size={48} strokeWidth={1.5} />
            </div>

            <div className="nearby-content">
              <h2>Find a Ludovico near you</h2>

              <p>Explore nearby vending machines</p>
            </div>
          </div>
        </section>

        {/* ========================================
            COLLECTIONS
        ======================================== */}

        <section className="collections-section">
          <div className="section-header">
            <h2>Collections</h2>

            <div className="collection-arrows">
              <button type="button">
                <ChevronLeft size={16} />
              </button>

              <button type="button">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="collections">
            {collections.map((collection) => (
              <article className="collection-card" key={collection.id}>
                <img src={collection.image} alt={collection.name} />

                <div className="collection-info">
                  <h3>{collection.name}</h3>

                  <span>{collection.type}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================
            LUDOVICO SIGNATURE
        ======================================== */}

        <section className="signature-section">
          <div className="section-title">
            <h2>Ludovico Signature</h2>
          </div>

          <div className="signature-card">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900"
              alt="Ludovico Signature"
            />

            <div className="signature-overlay" />

            <div className="signature-logo">
              <img src="/ludovico-logo.jpeg" alt="" />
            </div>
          </div>
        </section>

        {/* ========================================
            MAKE YOUR OWN COFFEE
        ======================================== */}

        <section className="make-coffee-section">
          <div className="section-title">
            <h2>Make Your Own Coffee</h2>
          </div>

          <div className="make-coffee-card">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900"
              alt="Make Your Own Coffee"
            />

            <div className="make-coffee-overlay" />

            <div className="make-coffee-content">
              <span>CREATE YOUR PERFECT CUP</span>

              <h3>Make it your way.</h3>

              <p>Choose your coffee, size and customizations.</p>

              <button type="button">Create Your Own</button>
            </div>
          </div>
        </section>

        {/* ========================================
            BEST SELLERS
        ======================================== */}

        <section className="best-sellers-section">
          <div className="section-header">
            <h2>Best Sellers</h2>

            <button type="button" className="see-all-button">
              See all
            </button>
          </div>

          <div className="best-sellers">
            {bestSellers.map((product) => (
              <article className="best-seller-card" key={product.id}>
                <div className="best-seller-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <h3>{product.name}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ========================================
          BOTTOM NAVIGATION
      ======================================== */}

      <nav className="bottom-navigation">
        <button type="button" className="active">
          <HomeIcon size={20} />

          <span>Home</span>
        </button>

        <button type="button" onClick={() => navigate("/offers")}>
          <Tag size={20} />

          <span>Offers</span>
        </button>

        <button type="button" onClick={() => navigate("/categories")}>
          <Grid2X2 size={20} />

          <span>Categories</span>
        </button>

        <button type="button" onClick={() => navigate("/account")}>
          <UserRound size={20} />

          <span>Account</span>
        </button>
      </nav>
    </main>
  );
};

export default Home;
