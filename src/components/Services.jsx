import React, { useEffect, useRef } from 'react';
import './Services.css';

const SERVICES = [
  {
    icon: 'fas fa-paint-brush',
    title: 'Web Design',
    desc: 'Beautiful, on-brand designs crafted to impress and convert. Every pixel has a purpose — from color choices to spacing and typography.',
  },
  {
    icon: 'fas fa-code',
    title: 'Frontend Development',
    desc: 'Fast, clean, and responsive websites built with modern HTML, CSS, and JavaScript. Semantic code that is accessible and maintainable.',
  },
  {
    icon: 'fab fa-react',
    title: 'React Development',
    desc: 'Dynamic, component-driven UIs built with React. State management, hooks, and clean architecture to power complex web applications.',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Responsive Design',
    desc: 'Pixel-perfect layouts that look stunning on any screen — mobile, tablet, or desktop. Mobile-first development as standard.',
  },
  {
    icon: 'fas fa-tachometer-alt',
    title: 'Performance Optimization',
    desc: 'Auditing and optimizing web projects for speed, accessibility, and SEO. Clean code that scores high on all Lighthouse metrics.',
  },
  {
    icon: 'fas fa-bug',
    title: 'Bug Fixing & Maintenance',
    desc: 'Troubleshooting, debugging, and maintaining existing websites. Keeping your project running smoothly and up to date.',
  },
];

export default function Services() {
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

  return (
    <section className="section" id="services" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">What I Offer</span>
        <h2 className="section__title reveal">My <span>Services</span></h2>
        <div className="section__line reveal" />
        <div className="services__grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className={`service-card reveal delay-${(i % 3) + 1}`}
            >
              <div className="service-card__icon">
                <i className={svc.icon} />
              </div>
              <h3 className="service-card__title">{svc.title}</h3>
              <p className="service-card__desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
