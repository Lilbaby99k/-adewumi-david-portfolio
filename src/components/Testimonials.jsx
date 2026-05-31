import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './Testimonials.css';

export default function Testimonials() {
  const { testimonials } = useAdmin();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fas fa-star ${i < count ? 'star--filled' : 'star--empty'}`} />
    ));

  return (
    <section className="section" id="testimonials" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">What Clients Say</span>
        <h2 className="section__title reveal">Testi<span>monials</span></h2>
        <div className="section__line reveal" />

        <div className="testimonials__slider reveal">
          <div className="testimonials__track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-card__quote">
                  <i className="fas fa-quote-left" />
                </div>
                <p className="testimonial-card__message">{t.message}</p>
                <div className="testimonial-card__stars">{renderStars(t.stars)}</div>
                <div className="testimonial-card__author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="testimonials__dots reveal">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${active === i ? 'testimonials__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
