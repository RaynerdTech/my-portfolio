// app/components/ParticleBackground.tsx
'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    // This effect runs once to initialize the tsParticles engine
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine); // Load the full bundle
    }).then(() => {
      setInit(true); // Set init to true once the engine is loaded
    });
  }, []); // <--- HERE! Changed from },) to }, [])

  // If the engine is not yet initialized, return null or a loading indicator
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Assuming -1 fixed your previous issue
        background: { color: 'transparent' },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              width: 2000,
              height: 2000,
            },
          },
          color: { value: '#60A5FA' },
          links: {
            enable: true,
            distance: 50,
            color: '#60A5FA',
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: {
            value: 14,
          },
          opacity: {
            value: 0.1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
      }}
    />
  );
};