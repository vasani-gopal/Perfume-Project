import React, { useState } from 'react';
import { Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const brandNames = ['Jimmy Choo', 'Royale Flair', 'Coco Noir', 'Prada', 'Red Diamond', 'Sauvage'];

  const handleSubmit = () => {
    if (email) {
      alert('Subscribed! 🎉');
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Newsletter */}
        <div className="fade-in-up" style={styles.newsletter}>
          <h3 className="animated-title" style={styles.newsletterTitle}>
            Join The Fragrance Club
          </h3>
          <div style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              style={styles.input}
            />
            <button 
              onClick={handleSubmit}
              className="subscribe-btn"
              style={styles.button}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Brands */}
        <div className="fade-in-up-delay" style={styles.brands}>
          {brandNames.map((brand, idx) => (
            <span 
              key={brand} 
              className="brand-tag"
              style={{
                ...styles.brand,
                animationDelay: `${idx * 0.1}s`
              }}
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="fade-in-up-delay-2" style={styles.links}>
          <div>
            <h4 style={styles.linkTitle}>Shop</h4>
            <ul style={styles.linkList}>
              {['New Arrivals', 'Best Sellers', 'Gift Sets', 'Sale'].map((item) => (
                <li 
                  key={item}
                  className="link-item"
                  style={styles.linkItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={styles.linkTitle}>Support</h4>
            <ul style={styles.linkList}>
              {['Help Center', 'Track Order', 'Returns', 'Shipping Info'].map((item) => (
                <li 
                  key={item}
                  className="link-item"
                  style={styles.linkItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="fade-in-up-delay-3" style={styles.social}>
          {[
            { Icon: Instagram, delay: '0s' },
            { Icon: Twitter, delay: '0.1s' },
            { Icon: Youtube, delay: '0.2s' },
            { Icon: MessageCircle, delay: '0.3s' }
          ].map(({ Icon, delay }, idx) => (
            <a 
              key={idx}
              href="#" 
              className="social-icon"
              style={{
                ...styles.icon,
                animationDelay: delay
              }}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="fade-in-final" style={styles.copy}>
          © 2025 PerfumeHub • Crafted with ❤️ in India
        </p>
      </div>
    </footer>
  );
}

const keyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }

  /* Animated underline for title */
  .animated-title {
    position: relative;
    display: inline-block;
  }

  .animated-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, transparent, #8b5cf6, #a855f7, transparent);
    animation: underlineFlow 2s linear infinite;
    border-radius: 2px;
  }

  @keyframes underlineFlow {
    0% { transform: translateX(-100%); opacity: 0.5; }
    50% { transform: translateX(0%); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0.5; }
  }

  /* Basic fade delays */
  .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
  .fade-in-up-delay { animation: fadeInUp 1s ease-out forwards; }
  .fade-in-up-delay-2 { animation: fadeInUp 1.2s ease-out forwards; }
  .fade-in-up-delay-3 { animation: fadeInUp 1.4s ease-out forwards; }
  .fade-in-final { animation: fadeInUp 1.6s ease-out forwards; }

  /* Brand floating glow */
  .brand-tag {
    animation: float 3s ease-in-out infinite;
  }

  .brand-tag:hover {
    border-color: #8b5cf6 !important;
    color: #8b5cf6 !important;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.5) !important;
    transform: scale(1.1);
  }

  /* Input glow */
  .email-input:focus {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5) !important;
  }

  /* Button glow */
  .subscribe-btn:hover {
    transform: scale(1.05);
    background-color: #a855f7 !important;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.6) !important;
  }

  /* Links hover effect */
  .link-item:hover {
    color:rgb(173, 228, 20) !important;
    transform: translateX(6px);
    text-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
  }

  /* Social icon animation */
  .social-icon {
    animation: pulse 2.5s ease-in-out infinite;
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    color:rgb(254, 28, 20) !important;
    transform: scale(1.3) rotate(8deg);
    text-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
  }
`;

const styles = {
  footer: {
    background: 'radial-gradient(circle at center, #0a0a0a 0%, #000 100%)',
    color: '#fff',
    padding: '40px 20px 10px 20px',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center'
  },
  newsletter: {
    width: '100%'
  },
  newsletterTitle: {
    fontSize: '26px',
    marginBottom: '18px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '1px'
  },
  newsletterForm: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #444',
    backgroundColor: '#111',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    minWidth: '260px'
  },
  button: {
    padding: '12px 28px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#8b5cf6',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  brands: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  brand: {
    padding: '8px 18px',
    borderRadius: '14px',
    border: '1px solid #333',
    background: 'rgba(20,20,20,0.7)',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  links: {
    display: 'flex',
    gap: '70px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '25px'
  },
  linkTitle: {
    fontWeight: 'bold',
    marginBottom: '14px',
    fontSize: '17px',
    color: '#a855f7'
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  linkItem: {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '15px',
    color: '#ccc'
  },
  social: {
    display: 'flex',
    gap: '25px',
    fontSize: '22px',
    marginTop: '25px'
  },
  icon: {
    color: '#fff',
    transition: 'all 0.4s ease',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  copy: {
    fontSize: '13px',
    color: '#aaa',
    marginTop: '25px'
  }
};
