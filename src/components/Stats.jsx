import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';

const STATS = [
  { target: 2, label: 'Years Experience' },
  { target: 30, label: 'Projects Completed' },
  { target: 5, label: 'Technologies' },
  { target: 20, label: 'Happy Clients' },
];

function useCounter(target, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return count;
}

function StatCard({ stat, active, delay }) {
  const count = useCounter(stat.target, active);
  return (
    <div className="stat-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="stat-card__number">
        <span className="stat-card__num">{count}</span>
        <span className="stat-card__plus">+</span>
      </div>
      <p className="stat-card__label">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref} id="stats">
      <div className="stats__container">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} active={active} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
