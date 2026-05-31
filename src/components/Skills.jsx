import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const SKILLS = [
  { icon: 'fab fa-html5', name: 'HTML5', percent: 95 },
  { icon: 'fab fa-css3-alt', name: 'CSS3 / Tailwind', percent: 90 },
  { icon: 'fab fa-js-square', name: 'JavaScript (ES6+)', percent: 82 },
  { icon: 'fab fa-react', name: 'React.js', percent: 75 },
  { icon: 'fab fa-git-alt', name: 'Git & GitHub', percent: 88 },
  { icon: 'fas fa-mobile-alt', name: 'Responsive Design', percent: 92 },
];

function SkillBar({ skill, animate, delay }) {
  return (
    <div className="skill-item reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="skill-item__header">
        <span>
          <i className={skill.icon} />
          {skill.name}
        </span>
        <span>{skill.percent}%</span>
      </div>
      <div className="skill-item__bar">
        <div
          className="skill-item__fill"
          style={{ width: animate ? `${skill.percent}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (e.target === ref.current) setAnimate(true);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">What I Know</span>
        <h2 className="section__title reveal">My <span>Skills</span></h2>
        <div className="section__line reveal" />
        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              animate={animate}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
