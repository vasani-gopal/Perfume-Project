import React, { useEffect } from "react";

const celebrities = [
  {
    name: "Rihanna",
    src: "https://www.stylerave.com/wp-content/uploads/2025/01/1000-x-1000-5.png",
  },
  {
    name: "Johnny Depp",
    src: "https://i.pinimg.com/originals/2d/64/fc/2d64fc4c77f607aecf990c6b63b4e260.jpg",
  },
  {
    name: "Emilie Joseph",
    src: "https://imgs.search.brave.com/ZRXisjej4DbPLKwzdXuwHJ10FbHSjqyFbDEiEhaWuRc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L1Na/M0tiWURhSkxFUU53/Z1FYaEZoa2kuanBn",
  },
  {
    name: "Taylor Swift",
    src: "https://imgs.search.brave.com/NFQgw-EeXTSzKFKa4HnpmJX6OOzZ_lXyzfT1qkJaApI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L2FI/b3Azak03ZVFOSkpu/ek1tekQ4dTguanBn",
  },
  
];

export default function Celebrities() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          } else {
            entry.target.classList.remove("in");
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mist-wrap section">
      <div style={{ textAlign: "center" }}>
        <h2
          className="font-serif heading-gold reveal"
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "#ffd700",
          }}
        >
          Celebrity Collections
        </h2>
      </div><br />

      <div className="celebrity-grid">
        {celebrities.map((c) => (
          <div key={c.name} className="card-premium reveal">
            <div className="card-media">
              <img src={c.src} alt={c.name} />
              <div className="card-overlay">
                <span>{c.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PURE CSS STYLE */}
      <style>{`
        .celebrity-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          margin-top: 24px;
        }

        .card-premium {
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(166, 19, 19, 0.50);
          cursor: pointer;
          position: relative;
          transition: transform 0.4s ease;
        }

        .card-premium:hover {
          transform: scale(1.03);
        }

        .card-media {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .card-premium:hover img {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
          display: flex;
          align-items: flex-end;
          justify-content: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .card-premium:hover .card-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .card-overlay span {
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 15px;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .divider-gold {
          width: 90px;
          height: 3px;
          background: linear-gradient(90deg, #bfa14a, #f9d976);
          border: none;
          margin: 0 auto 40px;
        }

        /* Responsive Grid */
        @media (max-width: 1024px) {
          .celebrity-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .celebrity-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
