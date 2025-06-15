'use client';

import { motion } from 'framer-motion';
import { LavaLampBlob } from './LavaLampBlob'; // Assuming LavaLampBlob is a component that renders abstract, fluid shapes

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden backdrop-blur-md bg-transparent"
      style={{
        // Apply a linear gradient mask to the section itself for the fading background effect
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', // For Webkit browsers
      }}
    >
      {/* Background elements for depth and dynamism */}
      <div className="absolute inset-0 z-0">
        <LavaLampBlob />
        {/* Additional subtle background particles or stars for more depth */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          {/* Example: A simple div for a starry effect or subtle noise */}
          <div className="bg-repeat" style={{ backgroundImage: 'url("/images/star-pattern.svg")', backgroundSize: '10px 10px', opacity: 0.1 }}></div>
        </div>
      </div>

      <motion.div
        className="z-10 max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-10 bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700/50"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        // Remove the maskImage from this div, as it's for the overall background fade
      
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-3 sm:mb-4 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 text-transparent bg-clip-text drop-shadow-lg block">
            Hello, I&#39;m <span className="font-black">Ray</span>
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-200 font-semibold mt-3 sm:mt-4">
            A Creative Fullstack Developer
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I craft scalable, performant, and visually captivating web applications, transforming complex ideas into intuitive user experiences with modern technologies.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 group w-full sm:w-auto"
          >
            See My Work
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-200 border border-slate-600 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-slate-500/50 bg-slate-800/60 hover:bg-slate-700/60 group w-full sm:w-auto"
          >
            Get In Touch
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:rotate-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.907l-7.195 3.58a2.25 2.25 0 01-2.192 0L2.25 8.907M12 12.75h.008v.008H12z" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};