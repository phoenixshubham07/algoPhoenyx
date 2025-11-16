'use client';

import { useEffect, useState } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function LazyParticles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Don't render the particles on the server, and wait a moment on the client
    // to avoid blocking the initial page render.
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ParticlesBackground />;
}
