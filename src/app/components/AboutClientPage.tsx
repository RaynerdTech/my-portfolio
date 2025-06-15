// app/components/AboutClientPage.tsx
// This is the new CLIENT COMPONENT.

'use client'; // This directive is essential here!

// All your original imports remain here
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Icon Imports
import {
  FaLaptopCode, FaServer, FaWordpress, FaGitAlt, FaReact,
  FaNodeJs, FaTools, FaQuoteLeft, FaGraduationCap,
  FaHtml5, FaCss3Alt, FaJsSquare
} from 'react-icons/fa';
import { TbBrandNextjs, TbBrandTypescript, TbBrandFramer } from 'react-icons/tb';
import { SiMongodb, SiExpress, SiTailwindcss, SiWordpress } from 'react-icons/si';
import { FiMessageSquare, FiUsers, FiAward } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';

import { ContactSection } from './ContactSection';
import type { JSX } from 'react';

// --- Type Definitions ---
interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; icon: JSX.Element; }[];
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: JSX.Element;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
}

// --- DATA (All data remains in the client component as it contains JSX icons) ---

const personalStoryContent = {
  title: 'My Journey: Crafting Digital Excellence from Passion',
  description: `Hello! I'm Ray, a Full-Stack Developer based in Lagos who loves turning ideas into smooth, scalable digital experiences. I’m all about clean code, great design, and solving real problems.`,
  furtherDetails: `I started with basic HTML/CSS and grew into building full-stack web apps with powerful backends and sleek frontends. I care about the little details, love creative challenges, and always aim to deliver work that’s both smart and user-friendly.`,
  imageUrl: '/images/raynerd-tech.jpg',
  imageAlt: 'Giblify Protrait of Raynerd Tech, a passionate Full-Stack Developer based in Lagos, Nigeria',
};

const extraterrestrialGoal = {
  title: 'My Extraterrestrial Goal: Beyond Just Code',
  description: `I'm not just building websites; I'm crafting immersive digital ecosystems designed to push the boundaries of what's possible online. My ultimate aim is to create user experiences so intuitive and engaging, they feel truly out of this world, fostering innovation that transcends the ordinary.`,
};

const technicalSkills: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      skills: [
        { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
        { name: 'CSS3 / SCSS', icon: <FaCss3Alt className="text-blue-400" /> },
        { name: 'JavaScript (ES6+)', icon: <FaJsSquare className="text-yellow-400" /> },
        { name: 'TypeScript', icon: <TbBrandTypescript className="text-blue-500" /> },
        { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
        { name: 'Next.js', icon: <TbBrandNextjs className="text-white" /> },
        { name: 'WordPress', icon: <SiWordpress className="text-blue-600" /> },
        { name: 'Framer Motion', icon: <TbBrandFramer className="text-purple-400" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
        { name: 'Responsive Design', icon: <FaLaptopCode className="text-green-400" /> },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress className="text-gray-400" /> },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb className="text-green-700" /> },
      ],
    },
    {
      id: 'cms-tools',
      title: 'CMS & Tools',
      skills: [
        { name: 'WordPress', icon: <FaWordpress className="text-blue-600" /> },
        { name: 'Elementor', icon: <FaTools className="text-pink-500" /> },
        { name: 'Git', icon: <FaGitAlt className="text-red-600" /> },
        { name: 'GitHub', icon: <FaGitAlt className="text-gray-200" /> },
        { name: 'VS Code', icon: <FaTools className="text-blue-300" /> },
      ],
    },
    {
      id: 'soft-skills',
      title: 'Soft Skills',
      skills: [
        { name: 'Problem-Solving', icon: <FaLightbulb className="text-yellow-300" /> },
        { name: 'Effective Communication', icon: <FiMessageSquare className="text-cyan-300" /> },
        { name: 'Collaboration & Teamwork', icon: <FiUsers className="text-purple-300" /> },
        { name: 'Adaptability', icon: <FiAward className="text-orange-300" /> },
        { name: 'Attention to Detail', icon: <FaLightbulb className="text-lime-300" /> },
        { name: 'Continuous Learning', icon: <FaLightbulb className="text-fuchsia-300" /> },
      ],
    },
];

const testimonials: Testimonial[] = [
  {
    quote: "Ray completely transformed our e-commerce platform. Before, we were struggling with 3-second load times, but after his optimizations, our site loads in under 0.8 seconds. Our sales increased by 40% in just two months!",
    author: "Adebayo Ogunlesi",
    title: "CEO, NaijaMarket Online",
    rating: 5,
  },
  {
    quote: "As a small business owner in Lagos, I was skeptical about hiring a developer online. But Ray proved me wrong - he built our restaurant website exactly how we wanted, even adding a Jumia food integration we didn't know was possible!",
    author: "Chioma Eze",
    title: "Owner, Spicy Heaven Restaurant",
    rating: 5,
  },
  {
    quote: "Our church website was outdated for years until Ray redesigned it. Now we can stream services without buffering, even with 500+ concurrent viewers. The donation system he implemented increased our tithes by 25%.",
    author: "Pastor Benjamin Adeleke",
    title: "RCCG Grace Tabernacle",
    rating: 4,
  },
  {
    quote: "Ray fixed our university portal that had been crashing during registration periods. Since his overhaul, we've had zero downtime even with 10,000 students accessing at once. His solution saved our IT team countless headaches.",
    author: "Dr. Amina Mohammed",
    title: "Registrar, Kwara State University",
    rating: 5,
  },
  {
    quote: "I run a small fashion business in Abuja. Ray created a simple but beautiful website that makes my designs look professional. Now I get orders from as far as London and Dubai! He even taught me how to update it myself.",
    author: "Ngozi Okoro",
    title: "Creative Director, Zinara Designs",
    rating: 5,
  },
  {
    quote: "The POS system Ray customized for our supermarket chain works perfectly with our existing infrastructure. It handles both card and transfer payments smoothly, even during network issues. Our checkout lines move twice as fast now.",
    author: "Alhaji Ibrahim Bello",
    title: "Operations Manager, Everyday Superstores",
    rating: 5,
  },
  {
    quote: "As a blogger, I needed someone who could make my site load fast on Nigerian networks. Ray optimized everything - from compressing my images to implementing lazy loading. My bounce rate dropped from 70% to 35%!",
    author: "Funke Adebayo",
    title: "Founder, NaijaTechGuide",
    rating: 4,
  }
];
const certifications: Certification[] = [
    {
      name: 'Frontend Web Developer',
      issuer: 'Mandavo Computer School',
      date: 'February 2023',
      icon: <FaGraduationCap className="text-blue-400" />,
      imageUrl: '/images/frontend-certificate.jpg',
      imageAlt: 'Mandavo Computer School Frontend Developer Certificate',
    },
    {
      name: 'WordPress Elementor Developer',
      issuer: 'Mandavo Computer School',
      date: 'April 2023',
      icon: <FaWordpress className="text-teal-400" />,
      imageUrl: '/images/wordpress-certificate.jpg',
      imageAlt: 'Mandavo Computer School WordPress Elementor Developer Certificate',
    },
    {
      name: 'Backend Developer (Node.js, Express, MongoDB)',
      issuer: 'Axia Africa',
      date: 'August 2023',
      icon: <FaServer className="text-green-400" />,
      imageUrl: '/images/backend-certificate.jpg',
      imageAlt: 'Axia Africa Backend Developer Certificate',
    },
];


// --- FRAMER MOTION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.1 } },
};

const skillPillVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 10 } },
  hover: { scale: 1.05, boxShadow: "0 0 15px rgba(128,0,128,0.5)", transition: { duration: 0.2 } },
};

// The main component function, renamed to avoid conflicts.
export default function AboutClientPage() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>(technicalSkills[0].id);

  const personalStoryControls = useAnimation();
  const extraterrestrialControls = useAnimation();
  const skillsControls = useAnimation();
  const certificationsControls = useAnimation();
  const testimonialsControls = useAnimation();

  const [personalStoryRef, personalStoryInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [extraterrestrialRef, extraterrestrialInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [certificationsRef, certificationsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => { if (personalStoryInView) personalStoryControls.start('show'); }, [personalStoryControls, personalStoryInView]);
  useEffect(() => { if (extraterrestrialInView) extraterrestrialControls.start('show'); }, [extraterrestrialControls, extraterrestrialInView]);
  useEffect(() => { if (skillsInView) skillsControls.start('show'); }, [skillsControls, skillsInView]);
  useEffect(() => { if (certificationsInView) certificationsControls.start('show'); }, [certificationsControls, certificationsInView]);
  useEffect(() => { if (testimonialsInView) testimonialsControls.start('show'); }, [testimonialsControls, testimonialsInView]);

  const contactSectionRef = useRef<HTMLDivElement>(null);
  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSkills = technicalSkills.find(cat => cat.id === activeSkillCategory);

  // The entire JSX from your original file goes here
  return (
    <main className="relative bg-gradient-to-br from-[#0A0C16] to-[#1B263D] text-white overflow-hidden py-16 lg:py-24 grainy">

      {/* Global Background Blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-1000"></div>
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-5000"></div>


      {/* 1. Personal Story / Background Section */}
      <section id="about-intro" className="relative z-10 py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <motion.div
          ref={personalStoryRef}
          initial="hidden"
          animate={personalStoryControls}
          variants={sectionVariants}
          className="flex-1 text-center lg:text-left"
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-tight drop-shadow-lg"
            variants={itemVariants}
          >
            {personalStoryContent.title}
          </motion.h1>
          <motion.p className="text-lg sm:text-xl text-slate-300 mb-6 leading-relaxed" variants={itemVariants}>
            {personalStoryContent.description}
          </motion.p>
          <motion.p className="text-md sm:text-lg text-slate-400 leading-relaxed" variants={itemVariants}>
            {personalStoryContent.furtherDetails}
          </motion.p>
          <motion.button
              onClick={scrollToContact}
              className="mt-8 px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-blue-700 shadow-[0_10px_20px_rgba(79,0,255,0.3)] hover:from-purple-800 hover:to-blue-800 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
              variants={itemVariants}
          >
              <p>Let&#39;s Connect</p>

          </motion.button>
        </motion.div>

        <motion.div
          className="flex-shrink-0 relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-purple-600 group hover:border-blue-500 transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          animate={personalStoryInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
          whileHover={{ rotate: 5, scale: 1.02 }}
        >
        <Image
            src={personalStoryContent.imageUrl}
            alt={personalStoryContent.imageAlt}
            fill
            sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            priority
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
      </section>

      {/* Extraterrestrial Goal Section - Highlighted */}
      <section id="extraterrestrial-goal" className="relative z-10 py-10 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          ref={extraterrestrialRef}
          initial="hidden"
          animate={extraterrestrialControls}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-lime-300 to-emerald-400 leading-tight drop-shadow-glow tracking-tight"
            variants={itemVariants}
          >
            {extraterrestrialGoal.title}
          </motion.h2>
          <motion.p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            {extraterrestrialGoal.description}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Skills / Tech Stack / Soft Skills Section */}
      <section id="skills" className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="pb-6 text-3xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-teal-300 to-sky-400 drop-shadow-lg tracking-tight"
        initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        My Expertise: Bridging Ideas to Reality
      </motion.h2>


        <div ref={skillsRef} className="space-y-12">
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
            initial="hidden"
            animate={skillsControls}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
          >
            {technicalSkills.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveSkillCategory(category.id)}
                className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-bold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1B263D] ${
                  activeSkillCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                }`}
                variants={itemVariants}
                aria-pressed={activeSkillCategory === category.id}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {currentSkills && (
              <motion.div
                key={activeSkillCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-center text-purple-400 mb-8 mt-10 md:mt-12 group">
                    {currentSkills.title}
                    <span className="block h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                </h3>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {currentSkills.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-purple-700 bg-purple-900/20 text-white
                                  hover:bg-purple-800/40 hover:border-blue-500 transition-all duration-300 ease-out cursor-pointer group
                                  text-lg sm:text-xl font-medium"
                      variants={skillPillVariants}
                      whileHover="hover"
                      custom={skillIndex}
                    >
                      <div className="text-2xl sm:text-3xl group-hover:animate-bounce-subtle">
                        {skill.icon}
                      </div>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Tools & Certifications Section */}
      <section id="certifications" className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <motion.h2
          className="pb-6 text-3xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-teal-300 to-sky-400 drop-shadow-lg tracking-tight"
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          My Journey of Growth & Certified Proficiency
        </motion.h2>

        <div ref={certificationsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              className="bg-gradient-to-br from-[#1a1c2c] to-[#2b3148] rounded-2xl shadow-xl border border-[#3b4369] flex flex-col overflow-hidden group hover:shadow-cyan-500/30 transition-shadow duration-500 cursor-pointer"
              initial="hidden"
              animate={certificationsControls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 100, damping: 12, delay: index * 0.15 }
                }
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              {cert.imageUrl && (
                <div className="relative w-full h-48 sm:h-56 bg-gray-800 border-b-2 border-purple-600 overflow-hidden">
                    <Image
                        src={cert.imageUrl}
                        alt={cert.imageAlt || `${cert.name} Certificate`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                    />
                </div>
              )}
              {!cert.imageUrl && (
                <div className="flex-grow flex items-center justify-center py-8">
                  <div className="text-7xl text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.icon}
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 text-center flex-grow flex flex-col justify-center">
                {cert.link ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`View certificate for ${cert.name}`} className="block">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-slate-400 text-lg mb-1">{cert.issuer}</p>
                    <p className="text-slate-500 text-md">{cert.date}</p>
                  </a>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-slate-400 text-lg mb-1">{cert.issuer}</p>
                    <p className="text-slate-500 text-md">{cert.date}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Testimonials / Reviews Section (Carousel) */}
 <section id="testimonials" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
  {/* Background elements */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
  <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

  <motion.h2
    className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
  >
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
      Client Testimonials
    </span>
  </motion.h2>

 <p className="text-lg text-gray-400 max-w-2xl mx-auto text-center mb-12">
  Don&#39;t just take our word for it – hear what our clients say
</p>


  <motion.div
    ref={testimonialsRef}
    initial="hidden"
    animate={testimonialsControls}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    }}
    className="relative"
  >
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={40}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      pagination={{
        clickable: true,
        el: '.testimonial-pagination',
        bulletClass: 'testimonial-bullet',
        bulletActiveClass: 'testimonial-bullet-active'
      }}
      navigation={{
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev',
      }}
      breakpoints={{
        640: { slidesPerView: 1.2, centeredSlides: true },
        768: { slidesPerView: 1.5, centeredSlides: true },
        1024: { slidesPerView: 2.5, centeredSlides: false },
        1280: { slidesPerView: 3, centeredSlides: false }
      }}
      className="!pb-12"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <motion.div
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
          >
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl border border-gray-700/50 hover:border-teal-400/30 transition-all duration-300 group">
              <div>
                <FaQuoteLeft className="text-teal-400/30 text-5xl mb-6 group-hover:text-teal-400/50 transition-colors" />
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 mr-1 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      viewBox="0 0 20 20"
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Navigation arrows */}
    <div className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-teal-400 cursor-pointer hover:bg-teal-400/10 hover:text-teal-300 transition-all transform -translate-x-2 hidden lg:flex">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
    <div className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-teal-400 cursor-pointer hover:bg-teal-400/10 hover:text-teal-300 transition-all transform translate-x-2 hidden lg:flex">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>

    {/* Pagination */}
    <div className="testimonial-pagination flex justify-center items-center space-x-2 !bottom-0" />
  </motion.div>

  {/* Custom pagination styles */}
  <style jsx global>{`
    .testimonial-bullet {
      width: 12px;
      height: 12px;
      display: inline-block;
      border-radius: 50%;
      background: #4B5563;
      margin: 0 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .testimonial-bullet-active {
      background: #2DD4BF;
      transform: scale(1.3);
    }
  `}</style>
</section>

      
      {/* Include the Contact Section */}
      <div ref={contactSectionRef} >
        <ContactSection />
      </div>
    </main>
  );
}