'use client';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid SSR entirely

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 px-6 md:px-8 bg-slate-900/60 backdrop-blur-md border-t border-purple-500/20 shadow-inner overflow-hidden z-[100]">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: 'url("/images/noise.svg")', backgroundSize: '200px 200px' }}
      />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-50 max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-1">
        <p className="text-slate-400 text-sm">
          © {currentYear} YourName. All rights reserved.
          <a
            href="http://raynerd.com.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline cursor-pointer ml-1"
          >
            Powered by RaynerdTech
          </a>
        </p>
      </div>
    </footer>
  );
};
