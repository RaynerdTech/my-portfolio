'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set 'scrolled' to true if user scrolls down more than 20px
      // A smaller threshold might feel more responsive for background change
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling and overflow on mobile when menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (mobileOpen) {
      html.style.overflow = 'hidden'; // Prevents scrolling on html element
      body.style.overflow = 'hidden'; // Prevents scrolling on body element
      // For iOS Safari, you might need to additionally set position: fixed on body
      // body.style.position = 'fixed';
      // body.style.width = '100%';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      // body.style.position = '';
      // body.style.width = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      // body.style.position = '';
      // body.style.width = '';
    };
  }, [mobileOpen]);

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  return (
    <motion.header
      // The initial animation is fine for a one-time entrance
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      // Base classes always apply
      className={`fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-6 md:px-8 lg:px-12 transition-all duration-300
        ${scrolled
          ? 'bg-gradient-to-r from-slate-900/90 to-black/90 backdrop-blur-lg border-b border-purple-500/30 shadow-xl'
          : 'bg-transparent backdrop-blur-md border-b border-transparent' // Make background transparent when not scrolled
        }
      `}
      // Removed redundant overflow-x-hidden here.
      // If you still have horizontal scroll issues, it's likely a content element
      // outside the header that needs overflow-x-hidden on its parent or a global wrapper.
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="#"
          className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300 ease-out tracking-wide"
        >
          Ray()
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-x-10 lg:gap-x-12 text-slate-200 font-medium">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="relative text-lg group px-2 py-1 transition-colors duration-300 ease-out"
              variants={linkVariants}
              whileHover="hover"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            key={mobileOpen ? "x-icon" : "menu-icon"}
            initial={{ rotate: mobileOpen ? -90 : 90, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed inset-0 w-screen h-screen overflow-y-auto bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 z-40"
          >
            {/* Close button for mobile menu, explicitly positioned within the overlay */}
            <motion.button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2 z-50" // Increased z-index to ensure it's on top
              aria-label="Close menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <X size={36} />
            </motion.button>

            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                variants={mobileLinkVariants}
                custom={index}
                className="text-white text-4xl font-bold hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};