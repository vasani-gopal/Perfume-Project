import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const info = await axios.get("http://localhost:3000/perfume");
      setProduct(info.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // Reveal animation
  useEffect(() => {
    if (product.length === 0) return;
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
          } else {
            el.style.opacity = 0;
            el.style.transform = "translateY(20px)";
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [product]);

  // Mouse hover tilt
  const handleMouseMove = (e) => {
    const imgBox = e.currentTarget;
    const rect = imgBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / 20) * -1;
    const rotateY = (x - rect.width / 2) / 20;
    imgBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    imgBox.style.boxShadow = `0 20px 40px rgba(255,215,0,0.3)`;
  };

  const resetTilt = (e) => {
    const imgBox = e.currentTarget;
    imgBox.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    imgBox.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
  };

  return (
    <div style={{ background: "#fdf8ef", paddingBottom: "80px" }}>
      {/* Heading */}
      <section style={{ textAlign: "center", marginTop: "60px" }}>
        <h2
          className="reveal heading"
          style={{
            fontFamily: "serif",
            fontSize: "clamp(24px,3.4vw,42px)",
            fontWeight: 700,
            marginBottom: "20px",
            color: "#333",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.8s ease",
            display: "inline-block",
            position: "relative",
          }}
        >
          Luxury in Every Drop
          <span className="underline"></span>
        </h2>
        <p
          className="reveal"
          style={{
            color: "#6a5f3f",
            fontSize: "18px",
            marginBottom: "40px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          Explore timeless fragrances crafted for elegance & allure.
        </p>
      </section>

      {/* Product Grid */}
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {product.slice(0, 6).map((el, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              background: "#fff",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            <Link
              to={`/category/${el.category || "unknown"}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Image Box */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                style={{
                  width: "100%",
                  height: "350px", // ✅ Perfect balanced height
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={el.img}
                  alt={el.name || `product-${i}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Shimmer effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-75%",
                    width: "50%",
                    height: "100%",
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                    transform: "skewX(-25deg)",
                    animation: "shine 4s infinite",
                  }}
                ></div>
              </div>

              {/* Product Info */}
              <div
                style={{
                  padding: "15px 10px 25px",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    margin: "10px 0 5px",
                    color: "#333",
                    fontFamily: "serif",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {el.desc || "Unknown Perfume"}
                </h3>
                <p
                  style={{
                    color: "#a88600",
                    margin: 0,
                    fontWeight: 500,
                    letterSpacing: "1px",
                  }}
                >
                  {(el.category || "Misc").toUpperCase()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Animations & Responsive */}
      <style>{`
        @keyframes shine {
          0% { left: -75%; }
          100% { left: 125%; }
        }
        .heading .underline {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 3px;
          background: #e63946;
          animation: underlineMove 2s infinite;
        }
        @keyframes underlineMove {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }

        /* ✅ Responsive Fix */
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
