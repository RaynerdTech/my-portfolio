// app/components/ParticleBackground.tsx
'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';

export const ParticleBackground = () => {
  const [init, setInit] = useState(false); // State to track if particles engine is initialized

  useEffect(() => {
    // This effect runs once to initialize the tsParticles engine
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine); // Load the full bundle
    }).then(() => {
      setInit(true); // Set init to true once the engine is loaded
    });
  },); // Empty dependency array ensures this runs only once on mount

  // If the engine is not yet initialized, return null or a loading indicator
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -50 },
        background: { color: 'transparent' },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              width: 800,
              height: 800,
            },
          },
          color: { value: '#60A5FA' },
          links: {
            enable: true,
            distance: 150,
            color: '#60A5FA',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.5,
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