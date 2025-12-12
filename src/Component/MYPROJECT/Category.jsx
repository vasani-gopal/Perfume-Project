import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

export default function Category() {
  const [product, setProduct] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetchApi();
  }, [category]);

  const fetchApi = async () => {
    try {
      const info = await axios.get(`http://localhost:3000/${category}`);
      setProduct(info.data);
    } catch (err) {
      console.error("Error fetching category data:", err);
    }
  };

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
    imgBox.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Category Section */}
      <div style={{ padding: "00px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#ab1a1aff",
              letterSpacing: "1px",
              margin: 0,
              paddingBottom: "10px",
            }}
          >
            {category.toUpperCase()} COLLECTION

            {/* Animated line below heading */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "4px",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "50%", // line ka size
                  height: "100%",
                  background: "linear-gradient(90deg, #ffde59, #ff3e3e, #ffde59)",
                  animation: "slideLine 2s infinite alternate",
                }}
              ></span>
            </span>
          </h2>
        </div>

        <style>{`
  @keyframes slideLine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`}</style>


        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // ✅ fixed 3 items per row
            gap: "30px",
            justifyContent: "center" // agar items kam ho toh center align ho jaye
          }}
        >

          {product
            .filter(el => el && el.img && el.price)
            .map((el, i) => (
              <Link
                key={i}
                to={`/category/${category}/${el.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    textAlign: "center",
                    padding: "15px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Image Box */}
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetTilt}
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      transformStyle: "preserve-3d",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#f9f9f9",
                    }}
                  >
                    <img
                      src={el.img}
                      alt={`prod-${i}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
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
                          "linear-gradient(120deg, rgba(38, 194, 113, 0.2), rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                        transform: "skewX(-25deg)",
                        animation: "shine 4s infinite",
                      }}
                    ></div>
                  </div>

                  {/* Product Info */}
                  <div style={{ marginTop: "12px" }}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#e63946",
                        margin: "4px 0"
                      }}
                    >
                      {el.price}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#a88600",
                        margin: "2px 0"
                      }}
                    >
                      {(el.category || "Misc").toUpperCase()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <style>{`
          @keyframes shine {
            0% { left: -75%; }
            100% { left: 125%; }
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
}
