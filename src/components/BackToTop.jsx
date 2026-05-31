import React, { useState, useEffect } from 'react';
import './BackToTop.css';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`back-top ${show ? 'back-top--show' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
