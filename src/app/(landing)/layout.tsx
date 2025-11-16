'use client';

import { useEffect } from 'react';
import '@/styles/landing.css';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger-menu');
    const handleNavToggle = () => document.body.classList.toggle('nav-active');
    if (hamburger) hamburger.addEventListener('click', handleNavToggle);

    const navLinks = document.querySelectorAll('.nav-container .nav-link');
    const closeNav = () => document.body.classList.remove('nav-active');
    navLinks.forEach(link => link.addEventListener('click', closeNav));

    return () => {
      if (hamburger) hamburger.removeEventListener('click', handleNavToggle);
      navLinks.forEach(link => link.removeEventListener('click', closeNav));
    };
  }, []);

  return (
    <>
      <ParticlesBackground />

      <header className="navbar">
        <div className="logo-brand">
          <a href="/" className="logo-link">
            <span className="logo-icon">🔥</span> <span className="logo-text">AlgoPhoenyx</span>
          </a>
        </div>
        <button className="hamburger-menu" aria-label="Open Navigation Menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className="nav-container">
          <nav className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/hikari" className="nav-link">Hikari</a>
            <a href="/tavern" className="nav-link">Tavern</a>
            <a href="/judgement-hall" className="nav-link">Judgement Hall</a>
          </nav>
          <div className="nav-actions">
            <a href="#" className="btn btn-primary-gold">Login</a>
          </div>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-content">
          <p>© 2025 AlgoPhoenyx. Fall. Code. Burn.</p>
          <div className="footer-links">
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="footer-link">Terms of Service</a>
          </div>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GH</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LI</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">TW</a>
          </div>
        </div>
      </footer>
    </>
  );
}

