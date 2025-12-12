import React, { useEffect, useState } from 'react';
import Header from './Home/Header';
import Slider from './Home/Slider';
import Celebrities from './Home/Celebrities';
import Homeimg from './MYPROJECT/Homeimg';
import Footer from './Home/Footer';

export default function Home() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />
      <Slider />
      <Celebrities />
      <Homeimg/>
      <Footer />

      <button
        aria-label="Scroll to top"
        className={`scroll-top-btn ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 5l-7 7h4v7h6v-7h4z"/>
        </svg>
      </button>
    </div>
  );
}
