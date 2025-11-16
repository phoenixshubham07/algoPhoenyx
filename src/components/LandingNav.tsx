'use client';

import { useEffect } from 'react';

export default function LandingNav() {
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
  );
}
