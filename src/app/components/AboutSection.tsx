'use client';

import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from 'react-icons/fa'; // Example icons, adjust as needed
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiFramer, SiWordpress, SiCanva, SiGoogleanalytics } from 'react-icons/si';
// A richer, more diverse set of tech stack items
const techStack = [
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: 'React', icon: <FaReact className="text-blue-300" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Express.js', icon: <FaNodeJs className="text-gray-400" /> }, // Node.js icon for Express
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
  { name: 'Framer Motion', icon: <SiFramer className="text-purple-400" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
  { name: 'WordPress', icon: <SiWordpress className="text-blue-600" /> },
  { name: 'SEO', icon: <SiGoogleanalytics className="text-yellow-500" /> }, // Google Analytics as proxy for SEO
  { name: 'Canva', icon: <SiCanva className="text-sky-500" /> },
];

// Framer Motion variants for staggered animation of tech items
const techContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjust stagger timing
      delayChildren: 0.5,
    },
  },
};

const techItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
};

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative z-10 py-20 sm:py-28 lg:py-36 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center overflow-hidden"
    >
      {/* Subtle background gradients/blobs for visual interest */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>

      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 sm:mb-10 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tight drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Who I Am
      </motion.h2>

      <motion.p
        className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
      >
        I'm a passionate <span className="text-purple-300 font-bold">Fullstack Developer</span> dedicated to crafting exceptional digital experiences. My expertise lies in building high-performance, scalable, and visually stunning web applications using a cutting-edge tech stack.
      </motion.p>

      {/* Modernized Tech Stack Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
        variants={techContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500/50 transform transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden"
            variants={techItemVariants}
            whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(0,0,0,0.4), 0 0 15px rgba(99, 102, 241, 0.6)" }} // More pronounced hover
            whileTap={{ scale: 0.95 }}
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="z-10 text-5xl sm:text-6xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300 ease-out">
              {tech.icon}
            </div>
            <p className="z-10 text-white font-semibold text-base sm:text-lg whitespace-nowrap">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-slate-400 text-base sm:text-lg md:text-xl mt-16 sm:mt-20 max-w-3xl mx-auto font-light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
      >
        I thrive on transforming innovative ideas into tangible solutions with
        <span className="text-green-300 font-bold"> clean code</span>,
        <span className="text-pink-300 font-bold"> creative design</span>, and a relentless
        focus on <span className="text-yellow-300 font-bold"> user experience</span>.
      </motion.p>
    </section>
  );
};