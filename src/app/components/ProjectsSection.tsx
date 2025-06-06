// app/components/ProjectsSection.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// Project data
const projects = [
  {
    title: 'AI Portfolio Generator',
    image: '/images/project1.png.png',
    description: 'Generate stunning portfolios instantly with AI. Built with Next.js, OpenAI API, and TailwindCSS.',
    tags: ['Next.js', 'OpenAI', 'TailwindCSS'],
    github: 'https://github.com/yourusername/project1',
    demo: 'https://aiportfolio.vercel.app/',
  },
  {
    title: 'Movie App',
    image: '/images/project2.png.png',
    description: 'A visually rich movie browser app using TMDB API, filters, animations, and React routing.',
    tags: ['React', 'TailwindCSS', 'API'],
    github: 'https://github.com/yourusername/movie-app',
    demo: 'https://movieverse.vercel.app/',
  },
  {
    title: 'PixelGrid Marketplace',
    image: '/images/project3.png.png',
    description: 'Inspired by Million Dollar Homepage. Buy grid spots, upload ads, and showcase your brand.',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Cloudinary'],
    github: 'https://github.com/yourusername/pixel-grid',
    demo: 'https://pixelmarket.vercel.app/',
  },
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

export const ProjectsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  return (
    <section id="projects" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-0"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 sm:mb-12 md:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 tracking-tight drop-shadow-lg"
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        My Galactic Creations
      </motion.h2>

      <motion.div
        ref={ref}
        className="grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className="group relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transform transition-all duration-500 ease-out hover:scale-103 hover:border-purple-500 cursor-pointer"
            variants={itemVariants}
            whileHover={{
              y: -15,
              boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(168, 85, 247, 0.8)',
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-64 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-2 bg-gray-900 relative z-10">
              <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-600/30 text-purple-300 text-xs sm:text-sm font-medium px-3 py-1 sm:px-4 sm:py-1.5 rounded-full backdrop-filter backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-full border border-purple-500 hover:border-blue-400 bg-gradient-to-r from-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={20} />
                  <span>Code</span>
                </motion.a>
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-full border border-pink-500 hover:border-cyan-400 bg-gradient-to-r from-pink-600 to-cyan-600 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:shadow-cyan-500/30 w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt size={18} />
                  <span>Live Demo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};