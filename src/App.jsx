import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Admin from './components/Admin';

function PortfolioApp() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { loading } = useAdmin();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <i className="fas fa-spinner fa-spin" style={{
          fontSize: '2.5rem',
          color: 'var(--accent)'
        }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Loading portfolio...
        </p>
      </div>
    );
  }

  return (
    <>
      {showAdmin ? (
        <>
          <Navbar onAdminClick={() => setShowAdmin(false)} />
          <Admin />
        </>
      ) : (
        <>
          <Navbar onAdminClick={() => setShowAdmin(true)} />
          <main>
            <Hero />
            <Stats />
            <About />
            <Skills />
            <Services />
            <Portfolio />
            <Blog />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <PortfolioApp />
      </AdminProvider>
    </ThemeProvider>
  );
}