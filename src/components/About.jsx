import React, { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">Who I Am</span>
        <h2 className="section__title reveal">About <span>Me</span></h2>
        <div className="section__line reveal" />

        <div className="about__inner">
          {/* Image */}
          <div className="about__img-wrap reveal">
            <div className="about__img-frame">
              {/*
                Replace src with your actual photo path.
                Put your photo in /public and reference it as "/your-photo.jpg"
              */}
              <img
                src="/david.jpg"
                alt="Adewumi David"
              />
            </div>
            <div className="about__tag">🎯 Problem Solver</div>
          </div>

          {/* Text */}
          <div className="about__text reveal delay-1">
            <p>
              I'm <strong>Adewumi David Oluwadarasimi</strong>, a passionate
              Frontend Developer based in Nigeria. I specialize in building
              responsive, accessible, and visually compelling web interfaces
              that create meaningful user experiences.
            </p>
            <p>
              My journey in tech started with curiosity and grew into a career
              built on clean code, continuous learning, and creative
              problem-solving. I love turning complex requirements into elegant,
              simple solutions.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, reading about
              UI/UX design principles, and staying current with modern web
              standards.
            </p>

            <div className="about__details">
              <div className="about__detail">
                <i className="fas fa-envelope" />
                <span>davidlovemathematics@gmail.com</span>
              </div>
              <div className="about__detail">
                <i className="fas fa-map-marker-alt" />
                <span>Nigeria</span>
              </div>
              <div className="about__detail">
                <i className="fas fa-clock" />
                <span>Mon – Sat, 9am – 6pm WAT</span>
              </div>
              <div className="about__detail">
                <i className="fas fa-check-circle" />
                <span>Available for Freelance</span>
              </div>
            </div>

            <a
              href="https://docs.google.com/document/d/1ALhlu1QfHJbLrrvo-zvrdhmMHwDc2NrCcsuBTt5lVpc/edit?usp=sharing"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-download" /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
