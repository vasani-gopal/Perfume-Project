import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // get user & counts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

    const updateCounts = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setWishlistCount(wishlist.length);
      // Calculate total items in cart (including quantities)
      const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(totalCartItems);
    };

    updateCounts();

    // Listen for cart and wishlist updates
    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  // Fetch all products for search
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/perfume");
      const mainProducts = response.data;

      const categories = ["Jimmy Choo", "Fogg", "Coco Noir", "Prada", "Red Diamond", "Sauvage"];
      const allCategoryProducts = [];

      for (const category of categories) {
        try {
          const categoryResponse = await axios.get(`http://localhost:3000/${category}`);
          allCategoryProducts.push(...categoryResponse.data);
        } catch (err) {
          console.log(`No products found for category: ${category}`);
        }
      }

      const combinedProducts = [...mainProducts, ...allCategoryProducts];
      setAllProducts(combinedProducts);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allProducts.filter(
      (product) =>
        product.desc?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 8));
    setShowSearchResults(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/category/${product.category}/${product.id}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest(".search-container")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchResults]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const iconStyle = (isHovered) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: isHovered ? "#FFD700" : "white",
    textDecoration: "none",
    cursor: "pointer",
    margin: "0 8px",
    position: "relative",
    transition: "all 0.3s ease",
    transform: isHovered ? "scale(1.15)" : "scale(1)",
    boxShadow: isHovered ? "0 0 10px rgba(255,215,0,0.6)" : "0 0 0 rgba(0,0,0,0)",
    background: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
    borderRadius: "50%",
    padding: 6,
  });

  const badgeStyle = {
    position: "absolute",
    top: -5,
    right: -10,
    background: "#FFD700",
    color: "#000",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: 10,
    fontWeight: "bold",
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: showHeader ? 0 : "-100px",
          left: 0,
          width: "100%",
          zIndex: 1000,
          transition: "top 0.4s ease",
        }}
      >
        <Navbar
          expand="lg"
          style={{
            background: "rgba(0,0,0,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            padding: "15px 20px",
          }}
        >
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "1400px",
              width: "100%",
            }}
          >
            {/* Logo with animated rainbow effect */}
            <Navbar.Brand
              as={Link}
              to="/"
              style={{
                fontFamily: "serif",
                fontWeight: 700,
                fontSize: 25, // bada font
                textShadow: "0 0 10px rgba(255,215,0,0.5)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {Array.from("PERFUME").map((char, idx) => (
                <span
                  key={`p-${idx}`}
                  style={{
                    display: "inline-block",
                    animation: `colorChange 12s linear infinite`,
                    animationDelay: `${idx * 0.15}s`,
                  }}
                >
                  {char}
                </span>
              ))}

              {/* Extra space between words */}
              <span style={{ width: "12px", display: "inline-block" }}></span>

              {Array.from("CLUBE").map((char, idx) => (
                <span
                  key={`c-${idx}`}
                  style={{
                    display: "inline-block",
                    animation: `colorChange 12s linear infinite`,
                    animationDelay: `${(idx + 7) * 0.15}s`, // animation delay continue
                  }}
                >
                  {char}
                </span>
              ))}
            </Navbar.Brand>


            {/* Search */}
            <div
              className="search-container"
              style={{ flex: 1, maxWidth: 500, margin: "0 20px", position: "relative" }}
            >
              <form onSubmit={handleSearchSubmit}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search perfumes, brands..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "10px 0 0 10px",
                      height: 45,
                    }}
                  />
                  <Button
                    type="submit"
                    style={{
                      background: "linear-gradient(45deg, #FFD700, #FF9900)",
                      border: "none",
                      color: "#000",
                      fontWeight: 600,
                      borderRadius: "0 10px 10px 0",
                      padding: "0 18px",
                    }}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </form>

              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    marginTop: "5px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 1001,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {searchResults.map((product, index) => (
                    <div
                      key={`${product.category}-${product.id}-${index}`}
                      onClick={() => handleProductClick(product)}
                      style={{
                        padding: "12px 15px",
                        borderBottom:
                          index < searchResults.length - 1
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,215,0,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <img
                        src={product.img}
                        alt={product.desc}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          marginRight: "12px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "white", fontWeight: 500, fontSize: "14px" }}>
                          {product.desc}
                        </div>
                        <div style={{ color: "#FFD700", fontSize: "12px", marginTop: "2px" }}>
                          {product.category} • {product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showSearchResults && searchResults.length === 0 && searchQuery.trim() && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    marginTop: "5px",
                    padding: "20px",
                    textAlign: "center",
                    color: "white",
                    zIndex: 1001,
                  }}
                >
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>

            {/* Icons */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {currentUser ? (
                <div
                  style={iconStyle(hovered === "user")}
                  onClick={handleLogout}
                  onMouseEnter={() => setHovered("user")}
                  onMouseLeave={() => setHovered(null)}
                  title="Click to Logout"
                >
                  <FaUser size={20} />
                  <span style={{ fontSize: 12, marginTop: 2 }}>{currentUser.name}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={iconStyle(hovered === "user")}
                  onMouseEnter={() => setHovered("user")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <FaUser size={20} />
                  <span style={{ fontSize: 12, marginTop: 2 }}>Login</span>
                </Link>
              )}

              <Link
                to="/wishlist"
                style={iconStyle(hovered === "wishlist")}
                onMouseEnter={() => setHovered("wishlist")}
                onMouseLeave={() => setHovered(null)}
              >
                <FaHeart size={20} />
                <span style={{ fontSize: 12, marginTop: 2 }}>Wishlist</span>
                <span style={badgeStyle}>{wishlistCount}</span>
              </Link>

              <Link
                to="/cart"
                style={iconStyle(hovered === "cart")}
                onMouseEnter={() => setHovered("cart")}
                onMouseLeave={() => setHovered(null)}
              >
                <FaShoppingCart size={20} />
                <span style={{ fontSize: 12, marginTop: 2 }}>Cart</span>
                <span style={badgeStyle}>{cartCount}</span>
              </Link>
            </div>
          </Container>
        </Navbar>
      </div>

      <div style={{ height: 100 }} />

      {/* Logo Animation Keyframes */}
      <style>{`
        @keyframes colorChange {
          0%, 100% { color: #FFD700; }
          10% { color: #FF4500; }
          20% { color: #FF69B4; }
          30% { color: #8A2BE2; }
          40% { color: #00FFFF; }
          50% { color: #7FFF00; }
          60% { color: #FF1493; }
          70% { color: #00FA9A; }
          80% { color: #FF8C00; }
          90% { color: #1E90FF; }
        }
      `}</style>
    </>
  );
}
