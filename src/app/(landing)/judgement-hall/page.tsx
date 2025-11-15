'use client';

import { useEffect } from 'react';

const JudgementHallPage = () => {
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
        color: 'var(--neon-purple)', // Using a different neon color for variety
        textShadow: '0 0 20px var(--neon-purple)',
        marginBottom: '2rem',
      }}>
        The Judgement Hall
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '600px',
      }}>
        In this hall, code is tested and performance is measured. Speed, execution, and raw power determine the verdict.
      </p>
    </div>
  );
};

export default JudgementHallPage;
