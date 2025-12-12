import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import slide1 from "../../Img/Slider-1.jpg";
import slide2 from "../../Img/Slider-2.jpg";
import slide3 from "../../Img/Slider-3.jpg";

export default function Slider() {
  const [index, setIndex] = useState(0);

  // Auto slide every 3 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ marginTop: 8, textAlign: "center" }}>
      {/* ===== SLIDER ===== */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Carousel
          controls={true}
          indicators={false}
          fade
          activeIndex={index}
          onSelect={(selected) => setIndex(selected)}
        >
          <Carousel.Item>
            <img
              src={slide1}
              alt="Slide 1"
              draggable={false}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                userSelect: "none",
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              src={slide2}
              alt="Slide 2"
              draggable={false}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                userSelect: "none",
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              src={slide3}
              alt="Slide 3"
              draggable={false}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                userSelect: "none",
              }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* ===== CENTERED PROGRESS LINE ===== */}
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50%", // center width
            height: "5px",
            background: "rgba(255, 255, 255, 0.2)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          <div
            key={index}
            style={{
              height: "100%",
              width: "0%",
              background: "#FFD700",
              animation: "fillBar 3s linear forwards",
            }}
          ></div>
        </div>
      </div>

      {/* Animation inline */}
      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
