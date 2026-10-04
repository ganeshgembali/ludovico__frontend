import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  UserRound,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Tag,
  Grid2X2,
  Plus,
  ArrowRight,
  Star,
  Coffee,
} from "lucide-react";

import {
  getFeaturedProducts,
  getBestSellerProducts,
  getCollections,
  searchProducts,
} from "../../api/productApi";

import { useAuth } from "../../hooks/useAuth";

import "./Home.css";

/* =========================================================
   TEMPORARY FALLBACK DATA
   Used only while the backend returns an empty array.
========================================================= */

const FALLBACK_FEATURED = [
  {
    id: "demo-featured-1",
    name: "Mocha",
    description: "Rich chocolate, espresso and a smooth finish.",
    price: 220,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900",
  },
  {
    id: "demo-featured-2",
    name: "Iced Latte",
    description: "Smooth espresso with chilled creamy milk.",
    price: 220,
    category: "Cold Coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900",
  },
  {
    id: "demo-featured-3",
    name: "Cappuccino",
    description: "Bold espresso finished with silky milk foam.",
    price: 220,
    category: "Hot Coffee",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=900",
  },
  {
    id: "demo-featured-4",
    name: "Americano",
    description: "Clean, rich espresso with a smooth finish.",
    price: 200,
    category: "Hot Coffee",
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=900",
  },
];

const FALLBACK_BEST_SELLERS = [
  {
    id: "demo-best-1",
    name: "Cappuccino",
    category: "Hot Coffee",
    price: 220,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=700",
  },
  {
    id: "demo-best-2",
    name: "Iced Latte",
    category: "Cold Coffee",
    price: 220,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700",
  },
];

const FALLBACK_COLLECTIONS = [
  {
    id: "collection-1",
    name: "Coffee",
    type: "Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
  },
  {
    id: "collection-2",
    name: "Tea",
    type: "Tea",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500",
  },
  {
    id: "collection-3",
    name: "Cold Coffee",
    type: "Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
  {
    id: "collection-4",
    name: "Classics",
    type: "Special",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getProductImage = (product, fallback) =>
  product?.mainImage ||
  product?.image ||
  product?.images?.[0] ||
  product?.gallery?.[0] ||
  fallback;

const getProductPrice = (product) =>
  product?.basePrice ??
  product?.price ??
  product?.sizePrices?.[0]?.price ??
  220;

/*
  FIX: crypto.randomUUID() only exists in secure contexts (https / localhost).
  Opening the app through http://192.168.x.x on a phone would crash it, and a
  random id also changes on every call. A stable index-based fallback is safer.
*/
const normalizeProduct = (product, index, fallbackImage) => ({
  ...product,
  id: product?._id || product?.id || `product-${index}`,
  name: product?.name || "Ludovico Coffee",
  description:
    product?.shortDescription ||
    product?.description ||
    "A delicious Ludovico coffee made just for you.",
  category: product?.category || product?.subcategory || "Coffee",
  price: getProductPrice(product),
  image: getProductImage(product, fallbackImage),
});

const normalizeCollection = (collection, index) => ({
  ...collection,
  id: collection?._id || collection?.id || `collection-${index}`,
  name: collection?.name || collection?.title || `Collection ${index + 1}`,
  type: collection?.type || collection?.category || "Coffee",
  image:
    collection?.image ||
    collection?.mainImage ||
    collection?.products?.[0]?.image ||
    FALLBACK_COLLECTIONS[index % FALLBACK_COLLECTIONS.length].image,
});

/* Takeaway cup icon used in the centre "Order" button */
const CupIcon = ({ size = 27 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect x="5" y="2.5" width="14" height="3.4" rx="1.2" fill="#fff" />
    <path d="M6.3 6.4h11.4l-1.2 15.1H7.5L6.3 6.4Z" fill="#fff" />
    <path d="M6.75 11.2h10.5l-.4 5.2H7.15l-.4-5.2Z" fill="#b0001a" />
  </svg>
);

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /* DATA */
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  /* HOT / COLD */
  const [temperature, setTemperature] = useState("hot");

  /* SEARCH */
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  /* CAROUSEL */
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);
  const settleRef = useRef(null);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  /* =====================================================
     FETCH HOME DATA
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    const loadHomeData = async () => {
      setProductsLoading(true);

      try {
        const [featuredResponse, bestSellerResponse, collectionsResponse] =
          await Promise.all([
            getFeaturedProducts(),
            getBestSellerProducts(),
            getCollections(),
          ]);

        if (cancelled) return;

        const featured = featuredResponse?.data?.data?.products || [];
        const bestSeller = bestSellerResponse?.data?.data?.products || [];
        const backendCollections =
          collectionsResponse?.data?.data?.collections || [];

        setFeaturedProducts(
          featured.map((product, index) =>
            normalizeProduct(
              product,
              index,
              FALLBACK_FEATURED[index % FALLBACK_FEATURED.length].image,
            ),
          ),
        );

        setBestSellers(
          bestSeller.map((product, index) =>
            normalizeProduct(
              product,
              index,
              FALLBACK_BEST_SELLERS[index % FALLBACK_BEST_SELLERS.length].image,
            ),
          ),
        );

        setCollections(
          backendCollections.map((collection, index) =>
            normalizeCollection(collection, index),
          ),
        );
      } catch (error) {
        console.error("Unable to load Home data:", error);

        if (!cancelled) {
          setFeaturedProducts([]);
          setBestSellers([]);
          setCollections([]);
        }
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    };

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     DATA WITH FALLBACK
  ===================================================== */

  const displayedFeatured = useMemo(
    () => (featuredProducts.length ? featuredProducts : FALLBACK_FEATURED),
    [featuredProducts],
  );

  const displayedBestSellers = useMemo(
    () => (bestSellers.length ? bestSellers : FALLBACK_BEST_SELLERS),
    [bestSellers],
  );

  const displayedCollections = useMemo(
    () => (collections.length ? collections : FALLBACK_COLLECTIONS),
    [collections],
  );

  /* Three copies = endless looping in both directions */
  const carouselItems = useMemo(
    () => [...displayedFeatured, ...displayedFeatured, ...displayedFeatured],
    [displayedFeatured],
  );

  const originalCount = displayedFeatured.length;

  /* =====================================================
     CAROUSEL
  ===================================================== */

  const scrollToSlide = useCallback((index, behavior = "smooth") => {
    const container = carouselRef.current;
    const slide = container?.children[index];

    if (!container || !slide) return;

    container.scrollTo({
      left: slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2,
      behavior,
    });
  }, []);

  const goToSlide = useCallback(
    (index, behavior = "smooth") => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      scrollToSlide(index, behavior);
    },
    [scrollToSlide],
  );

  const stopAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);

    autoplayRef.current = setInterval(() => {
      goToSlide(activeIndexRef.current + 1);
    }, 4000);
  }, [goToSlide]);

  /* Continuous 3D effect: every card reacts to its distance from the centre */
  const applyCardEffects = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;

    Array.from(container.children).forEach((slide) => {
      // d = 0 centred, -1 one card to the left, +1 one card to the right
      const d =
        (slide.offsetLeft + slide.clientWidth / 2 - center) / slide.clientWidth;

      const a = Math.min(Math.abs(d), 1);

      const scale = 1 - a * 0.16;
      const rotateY = Math.max(-1, Math.min(1, d)) * -28; // angle toward centre
      const rotateZ = Math.max(-1, Math.min(1, d)) * 4; // slight tilt

      slide.style.transform = `scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      slide.style.opacity = String(1 - a * 0.25);
      slide.style.zIndex = String(10 - Math.round(a * 5));
    });
  }, []);

  /*
    FIX: the active index used to start at 0 (a duplicate copy) while the
    carousel was scrolled to the middle copy, so the wrong card looked active
    until the first scroll event. Now both start at the middle copy.
  */
  useEffect(() => {
    if (!originalCount) return;

    const frame = requestAnimationFrame(() => {
      goToSlide(originalCount, "auto");
      applyCardEffects();
    });

    startAutoplay();

    return () => {
      cancelAnimationFrame(frame);
      stopAutoplay();
      clearTimeout(settleRef.current);
    };
  }, [originalCount, goToSlide, startAutoplay, stopAutoplay]);

  const goToNextSlide = () => {
    if (!originalCount) return;
    goToSlide(activeIndexRef.current + 1);
    startAutoplay();
  };

  const goToPreviousSlide = () => {
    if (!originalCount) return;
    goToSlide(activeIndexRef.current - 1);
    startAutoplay();
  };

  /*
    FIX: the old scroll handler started a new setTimeout on every scroll event
    (dozens per swipe) and called setState inside a state updater. Now the
    active card is tracked on scroll and the loop "jump" happens once, after
    scrolling has settled.
  */

  /* Continuous 3D effect: every card reacts to its distance from the centre */

  const handleCarouselScroll = () => {
    const container = carouselRef.current;

    if (!container || !container.children.length) return;

    applyCardEffects();

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((slide, index) => {
      const distance = Math.abs(
        slide.offsetLeft + slide.clientWidth / 2 - containerCenter,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndexRef.current = closestIndex;
    setActiveIndex(closestIndex);

    clearTimeout(settleRef.current);

    settleRef.current = setTimeout(() => {
      const current = activeIndexRef.current;

      if (current >= originalCount * 2) {
        goToSlide(current - originalCount, "auto");
      } else if (current < originalCount) {
        goToSlide(current + originalCount, "auto");
      }
    }, 160);
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = async (event) => {
    event?.preventDefault();

    const query = searchValue.trim();

    if (!query || searchLoading) return;

    try {
      setSearchLoading(true);

      const response = await searchProducts(query);
      const products = response?.data?.data?.products || [];

      navigate("/products", {
        state: {
          searchQuery: query,
          searchResults: products,
        },
      });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  /* FIX: no more hard-coded "Raj" for logged-out users */
  const firstName = user?.name?.split(" ")[0];

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="home-page">
      {/* HEADER */}
      <header className="home-header">
        <div className="home-brand">
          <img
            src="/ludovico-logo.jpeg"
            alt="Ludovico Coffee"
            className="home-logo-mark"
          />

          <div className="home-brand-text">
            <strong>LUDOVICO</strong>
            <span>COFFEE</span>
          </div>
        </div>

        <div className="home-header-actions">
          <button
            type="button"
            className="header-icon-button"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.7} />
            <span className="notification-dot" />
          </button>

          <button
            type="button"
            className="profile-button"
            onClick={() => navigate("/account")}
            aria-label="Profile"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="" />
            ) : (
              <UserRound size={19} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="home-content">
        {/* GREETING */}
        <section className="home-greeting">
          <h1>Need a little reset{firstName ? `, ${firstName}` : ""}?</h1>
          <p>Find your next cup.</p>
        </section>

        {/* SEARCH + TEMPERATURE */}
        <form className="home-search-row" onSubmit={handleSearch}>
          <div className="home-search">
            <Search size={18} strokeWidth={1.7} />

            <input
              type="text"
              placeholder='Search "ice latte"'
              aria-label="Search drinks"
              aria-busy={searchLoading}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <div className="temperature-toggle">
            <button
              type="button"
              className={
                temperature === "hot"
                  ? "temperature-button active"
                  : "temperature-button"
              }
              onClick={() => setTemperature("hot")}
            >
              <Coffee size={14} />
              <span>HOT</span>
            </button>

            <button
              type="button"
              className={
                temperature === "cold"
                  ? "temperature-button active"
                  : "temperature-button"
              }
              onClick={() => setTemperature("cold")}
            >
              <span className="cold-symbol">✳</span>
              <span>COLD</span>
            </button>
          </div>
        </form>

        {/* NEARBY */}
        <section className="nearby-section">
          <div className="nearby-card">
            <div className="nearby-map">
              <div className="map-road map-road-one" />
              <div className="map-road map-road-two" />
              <div className="map-road map-road-three" />
              <div className="map-road map-road-four" />

              <MapPin
                className="nearby-pin"
                size={30}
                fill="#c0001d"
                strokeWidth={2}
              />
            </div>

            <div className="nearby-details">
              <span className="nearby-eyebrow">Nearest to you</span>

              <h2>Ludovico Coffee Station</h2>

              <p>DLF CyberHub, Gurugram</p>

              <p>0.8 km away</p>

              <button type="button" onClick={() => navigate("/location")}>
                View Directions
              </button>
            </div>
          </div>
        </section>

        {/* EXPLORE MENU */}
        <section className="explore-section">
          <div className="section-header">
            <div>
              <h2>Explore the menu</h2>
              <p>Based on your recent orders</p>
            </div>

            <button type="button" onClick={() => navigate("/products")}>
              See all
            </button>
          </div>

          <div className="menu-categories">
            {displayedCollections.map((collection) => (
              <button
                type="button"
                className="menu-category"
                key={collection.id}
                onClick={() => navigate("/products")}
              >
                <div className="menu-category-image">
                  <img src={collection.image} alt={collection.name} />
                </div>

                <span>{collection.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED CAROUSEL */}
        <section className="featured-section">
          <div
            className="featured-carousel"
            ref={carouselRef}
            onScroll={handleCarouselScroll}
          >
            {carouselItems.map((product, index) => (
              <article
                className={`featured-card ${
                  index === activeIndex ? "featured-card-active" : ""
                }`}
                key={`${product.id}-${index}`}
              >
                <div className="featured-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="featured-content">
                  <span className="featured-label">SEASONAL FAVOURITE</span>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/product/${product.slug || product.id}`)
                    }
                  >
                    Order now
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous featured product"
            >
              <ChevronLeft size={23} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next featured product"
            >
              <ChevronRight size={23} />
            </button>
          </div>
        </section>

        {/* MADE FOR YOU */}
        <section className="made-for-you-section">
          <div className="section-header">
            <div>
              <h2>Made for you</h2>
              <p>Based on your recent orders</p>
            </div>

            <button type="button" onClick={() => navigate("/products")}>
              See all
            </button>
          </div>

          {productsLoading && !bestSellers.length ? (
            <div className="product-loading">Loading...</div>
          ) : (
            <div className="made-for-you-grid">
              {displayedBestSellers.slice(0, 2).map((product) => (
                <article className="made-product-card" key={product.id}>
                  <img src={product.image} alt={product.name} />

                  <div className="made-product-info">
                    <h3>{product.name}</h3>

                    <span>{product.category}</span>

                    <strong>₹{product.price}</strong>

                    <button type="button" aria-label={`Add ${product.name}`}>
                      <Plus size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* BUILD YOUR OWN CUP */}
        <section className="build-cup-card">
          <div className="build-cup-icon">
            <Coffee size={28} />
          </div>

          <div className="build-cup-content">
            <h2>Build Your Own Cup</h2>
            <p>Customize your drink, your way.</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            aria-label="Build your own cup"
          >
            <ArrowRight size={21} />
          </button>
        </section>

        {/* REWARDS */}
        <section className="rewards-card">
          <div className="rewards-top">
            <div>
              <span className="rewards-label">LUDOVICO REWARDS</span>

              <h2>240 pts</h2>

              <p>60 points away from your next reward.</p>
            </div>

            <div className="rewards-star">
              <Star size={17} fill="currentColor" />
            </div>
          </div>

          <div className="rewards-progress-info">
            <span>240 / 300</span>
            <strong>80%</strong>
          </div>

          <div className="rewards-progress">
            <span />
          </div>

          <button type="button" onClick={() => navigate("/rewards")}>
            View rewards
          </button>
        </section>
      </div>

      {/* =================================================
          BOTTOM NAVIGATION
          Not fixed: it sits at the end of the page, so it
          only appears once you scroll all the way down.
      ================================================= */}

      <nav className="bottom-navigation" aria-label="Main navigation">
        {/* Dark bar with the curved notch cut-out */}
        <div className="bottom-nav-bg" aria-hidden="true">
          <span className="bottom-nav-side" />

          <svg
            className="bottom-nav-notch"
            viewBox="0 0 150 58"
            preserveAspectRatio="none"
          >
            <path d="M0 0H14C42 0 36 54 75 54C114 54 108 0 136 0H150V58H0Z" />
          </svg>

          <span className="bottom-nav-side" />
          <span className="bottom-nav-fill" />
        </div>

        <button
          type="button"
          className="active"
          onClick={() => navigate("/home")}
        >
          <HomeIcon size={22} strokeWidth={1.7} />
          <span>Home</span>
        </button>

        <button type="button" onClick={() => navigate("/offers")}>
          <Tag size={22} strokeWidth={1.7} />
          <span>Offers</span>
        </button>

        <span className="bottom-nav-spacer" aria-hidden="true" />

        <button type="button" onClick={() => navigate("/products")}>
          <Grid2X2 size={22} strokeWidth={1.7} />
          <span>Categories</span>
        </button>

        <button type="button" onClick={() => navigate("/account")}>
          <UserRound size={22} strokeWidth={1.7} />
          <span>Profile</span>
        </button>

        <button
          type="button"
          className="order-navigation-button"
          onClick={() => navigate("/products")}
          aria-label="Order"
        >
          <CupIcon />
          <span>Order</span>
        </button>
      </nav>
    </main>
  );
};

export default Home;
