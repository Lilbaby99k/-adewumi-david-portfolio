import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import './Portfolio.css';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'HTML/CSS', value: 'html' },
  { label: 'React', value: 'react' },
  { label: 'JavaScript', value: 'js' },
];

export default function Portfolio() {
  const { projects } = useAdmin();
  const [active, setActive] = useState('all');
  const ref = useRef(null);

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.cat.includes(active));

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <section className="section section-alt" id="portfolio" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">My Work</span>
        <h2 className="section__title reveal">Portfolio <span>Projects</span></h2>
        <div className="section__line reveal" />
        <div className="portfolio__filters reveal">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`portfolio__filter-btn ${active === f.value ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="portfolio__grid">
          {filtered.map((project, i) => (
            <div key={project.id} className={`portfolio-card reveal delay-${(i % 3) + 1}`}>
              <div className="portfolio-card__img">
                <img src={project.img} alt={project.title} loading="lazy" />
                <div className="portfolio-card__overlay">
                  <a href={project.link || '#'} className="btn btn-primary" target="_blank" rel="noreferrer">
                    <i className="fas fa-external-link-alt" /> View Project
                  </a>
                </div>
              </div>
              <div className="portfolio-card__info">
                <h3>{project.title}</h3>
                <span>{project.tags}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
