import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onAdminClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#home" className="navbar__logo" onClick={e => handleLink(e, '#home')}>
          Developer <span>X.</span>
        </a>

        <nav className="navbar__links">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href.slice(1) ? 'navbar__link--active' : ''}`}
              onClick={e => handleLink(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          <button className="navbar__admin-btn" onClick={onAdminClick} title="Admin">
            <i className="fas fa-user-shield" />
          </button>
          <a href="#contact" className="navbar__cta" onClick={e => handleLink(e, '#contact')}>
            Contact me
          </a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`navbar__mobile-link ${active === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
            onClick={e => handleLink(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <button className="navbar__mobile-admin" onClick={() => { setMenuOpen(false); onAdminClick(); }}>
          <i className="fas fa-user-shield" /> Admin Dashboard
        </button>
      </div>
    </header>
  );
}
