'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const Footer = () => (
  <motion.footer
    className="relative mt-24 py-12 px-6 md:px-8 bg-slate-900/60 backdrop-blur-md border-t border-purple-500/20 shadow-inner overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {/* Subtle background noise/glow */}
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/images/noise.svg")', backgroundSize: '200px 200px' }}></div>
    <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-2000" />
    <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-4000" />

    <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-1">
  <p className="text-slate-400 text-sm">© {new Date().getFullYear()} YourName. All rights reserved.</p>
</div>

  </motion.footer>
);
