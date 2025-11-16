import '@/styles/landing.css';
import LazyParticles from '@/components/LazyParticles';
import LandingNav from '@/components/LandingNav';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LazyParticles />
      <LandingNav />

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

