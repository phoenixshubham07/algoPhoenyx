'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import '@/styles/landing.css';

declare global {
  interface Window {
    pJSDom: any[];
    particlesJS: any;
  }
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleParticlesInit = () => {
    if (window.particlesJS) {
      // Destroy existing instance to prevent duplicates on navigation
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }

      let lineColor = '#ffaa00'; // Default neon gold
      if (pathname === '/hikari') {
        lineColor = '#00f3ff'; // Neon cyan for Hikari
      } else if (pathname === '/judgement-hall') {
        lineColor = '#bc13fe'; // Neon purple for Judgement Hall
      }

      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
          opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
          size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
          line_linked: { enable: true, distance: 150, color: lineColor, opacity: 0.6, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }
  };

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

  // Effect to re-initialize particles on path change
  useEffect(() => {
    // Ensure the script is loaded before trying to init
    if (window.particlesJS) {
      handleParticlesInit();
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="particles-script"
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        onLoad={handleParticlesInit}
      />
      <div id="particles-js"></div>

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
