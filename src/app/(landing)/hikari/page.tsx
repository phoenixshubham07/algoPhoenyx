'use client';

import { useEffect } from 'react';

const HikariPage = () => {
  useEffect(() => {
    // Page-specific scripts can be initialized here
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
        color: 'var(--neon-cyan)', // Using a different neon color for variety
        textShadow: '0 0 20px var(--neon-cyan)',
        marginBottom: '2rem',
      }}>
        Hikari's Grove
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '600px',
      }}>
        This is the domain of illumination and logic. Here, complex algorithms are untangled and the path to elegant solutions is made clear.
      </p>
    </div>
  );
};

export default HikariPage;
