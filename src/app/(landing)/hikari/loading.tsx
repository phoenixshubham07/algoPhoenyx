export default function Loading() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    }}>
      <style>
        {`
          .spinner {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 5px solid #222;
            border-top-color: var(--neon-cyan);
            animation: spin 1s linear infinite;
            box-shadow: 0 0 20px var(--neon-cyan);
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="spinner"></div>
    </div>
  );
}