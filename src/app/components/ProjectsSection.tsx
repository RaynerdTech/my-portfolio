'use client';

import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Pixel Ad',
    demo: 'https://pixel-ad-rho.vercel.app/',
    description: 'A grid-based advertising platform inspired by the Million Dollar Homepage.',
    tags: ['Next.js', 'MongoDB', 'TailwindCSS'],
    github: 'https://github.com/RaynerdTech/Pixel-Ad',
  },
  {
    title: 'Todo App',
    demo: 'https://todo-app-green-three-88.vercel.app/',
    description: 'A simple, elegant todo app with dynamic list management and filters.',
    tags: ['React', 'TailwindCSS'],
    github: 'https://github.com/RaynerdTech/TodoApp',
  },
  {
    title: 'Glory Event RSVP',
    demo: 'https://gloryrsvp.co.uk/',
    description: 'A wedding/event RSVP system with custom guest tracking and submission.',
    tags: ['PHP', 'Bootstrap', 'cPanel Hosting'],
    github: 'https://github.com/yourusername/event-rsvp',
  },
  {
    title: 'ShopNow',
    demo: 'https://shopnow.raynerd.com.ng/',
    description: 'An Ecommerce platform with product listings, cart management, and user authentication.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Nodejs', 'MongoDB', 'cPanel Hosting'],
    github: 'https://github.com/RaynerdTech/ecommerce-deploy',
  },
  {
    title: 'SoccerZone',
    demo: 'https://soccerzone.ng/',
    description: 'Football events booking website. Book field, register for matches and make payment.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'Amelia', 'cPanel Hosting', 'Other Plugins'],
    github: '#',
  },
  {
    title: 'CozyCoz',
    demo: 'https://cozycuz.com/',
    description: 'An Ecommerce platform built with WordPress, featuring product listings and cart management.',
    tags: ['WordPress', 'WooCommerce', 'cPanel Hosting'],
    github: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

export const ProjectsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('show');
  }, [controls, inView]);

  return (
    <section
      id="projects"
      className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-1000" />

      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold pb-10 sm:pb-12 md:pb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 tracking-tight drop-shadow-lg"
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
        {projects.map((project) => {
          const imageName =
            project.title.toLowerCase().replace(/\s+/g, '-') + '-preview.png';

          return (
            <motion.div
              key={project.title}
              className="group relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700"
              variants={itemVariants}
            >
              {/* Static Image Preview */}
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-64 overflow-hidden cursor-pointer group">
                <Image
                  src={`/images/${imageName}`}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6 bg-gray-900">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-600/30 text-purple-300 text-xs sm:text-sm font-medium px-3 py-1 rounded-full backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-white font-semibold py-2 px-4 rounded-full border border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 shadow-md w-full sm:w-auto"
                  >
                    <FaGithub size={18} />
                    Code
                  </motion.a>

                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-white font-semibold py-2 px-4 rounded-full border border-pink-500 bg-gradient-to-r from-pink-600 to-cyan-600 shadow-md w-full sm:w-auto"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
