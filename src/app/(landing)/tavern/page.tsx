'use client';

import { useEffect } from 'react';

const TavernPage = () => {
  useEffect(() => {
    // Re-initialize any page-specific scripts if needed, or just enjoy the background
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      paddingTop: '100px', // Offset for the fixed navbar
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
    }}>
      <h1 style={{
        fontSize: '4rem',
        color: 'var(--neon-gold)',
        textShadow: '0 0 20px var(--neon-gold)',
        marginBottom: '2rem',
      }}>
        The Tavern
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '600px',
      }}>
        Welcome, traveler. Rest your weary code-fingers. Here, we share stories of epic deploys, debug harrowing tales, and plan our next adventures in the vast world of development.
      </p>
    </div>
  );
};

export default TavernPage;

