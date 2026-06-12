import React, { useState, useEffect } from 'react';
import './Hero.css';

const ROLES = [
  'Frontend Developer',
  'React Developer',
  'UI/UX Enthusiast',
  'Web Designer',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = deleting ? 60 : 110;

    const timer = setTimeout(() => {
      if (!deleting) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex(prev => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__container">
        {/* LEFT — Text Content */}
        <div className="hero__content">
          <p className="hero__greeting">Hi, There!</p>

          <h1 className="hero__name">
            I'm <span>{typedText}</span>
            <span className="hero__cursor">|</span>
          </h1>

          <p className="hero__bio">
            I craft clean, fast, and beautiful web experiences. Passionate about
            turning ideas into pixel-perfect interfaces that actually work — and
            delight every user who visits.
          </p>

          {/* Social Icons */}
          <div className="hero__socials">
            <a href="https://www.facebook.com/share/1BVVpsDskL/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/dara467366?igsh=MTYzOHg1dTIzamRjdw==" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://x.com/Adewum83876Dave" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="https://www.linkedin.com/in/adewumi-david-oluwadarasimi-b42807332?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://github.com/Lilbaby99k" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hero__btns">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('contact')}
            >
              <i className="fas fa-briefcase" /> Hire me
            </button>
            <a
              href="https://docs.google.com/document/d/1DB3jXhEbjyxXwwLqmRIzeL5f8SCWLE1PZ98Tg36BfgY/edit?usp=sharing"
              className="btn btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-download" /> Download CV
            </a>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div className="hero__image-side">
          <div className="hero__img-wrap">
            <div className="hero__img-deco" />
            <div className="hero__img-frame">
              {/*
                Replace the src below with your actual photo:
                <img src="/your-photo.jpg" alt="Adewumi David" />
                Place your photo in the /public folder.
              */}
              <img
                src="/david.jpg"
                alt="Adewumi David"
              />
            </div>
            <div className="hero__badge">
              <span className="hero__badge-dot" /> Available for Work
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
    </section>
  );
}
