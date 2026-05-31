import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
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

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <ThemeProvider>
      <AdminProvider>
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
      </AdminProvider>
    </ThemeProvider>
  );
}
