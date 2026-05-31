import React from 'react';
import './Footer.css';

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <a href="#home" className="navbar__logo footer__logo" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
            Developer <span>X.</span>
          </a>
          <p>Building the web, one pixel at a time. Available for freelance projects and full-time roles.</p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-x-twitter" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          {['home', 'about', 'skills', 'services', 'portfolio', 'contact'].map(id => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>Web Design</a>
          <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>Frontend Development</a>
          <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>React Development</a>
          <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>Responsive Design</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>&copy; {year} <span>Adewumi David Oluwadarasimi</span>. All rights reserved.</p>
          <p>Built with <span>React</span> ⚛️</p>
        </div>
      </div>
    </footer>
  );
}
