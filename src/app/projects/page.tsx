// app/components/ProjectsPage.tsx
'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
// --- CORRECTED: FiRocket changed to FiTarget ---
import { FiZap, FiFeather, FiCode, FiTarget, FiPlus, FiMinus } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Import the ProjectsDisplay component (assuming you renamed it correctly)
import { ProjectsSection } from '../components/ProjectsSection'; // Ensure this path is correct based on your file structure

// --- EXISTING PRICING PLAN DATA (NO CHANGE) ---
const pricingPlans = [
  {
    name: 'Starter',
    webPrice: '$999',
    webUnit: '/project',
    mobilePrice: '$1499', // Example mobile price
    mobileUnit: '/app',
    description: 'Ideal for launching your online presence with essential features.',
    features: [
      'Responsive Design',
      'Up to 5 Pages/Screens',
      'Basic SEO/ASO Optimization',
      'Contact Form Integration',
      '1 Month Post-Launch Support',
    ],
    isClientChoice: false,
    buttonText: 'Get Started',
    cardGradientFrom: 'from-[#0A0C16]', // Dark slate/blue background
    cardGradientTo: 'to-[#1B263D]', // Darker blue/purple hue
  },
  {
    name: 'Scale',
    webPrice: '$2499',
    webUnit: '/project',
    mobilePrice: '$3499', // Example mobile price
    mobileUnit: '/app',
    description: 'Perfect for growing businesses needing robust functionality and scalability.',
    features: [
      'Everything in Starter',
      'Up to 15 Pages/Screens',
      'Custom CMS Integration (e.g., Sanity, Strapi)',
      'Advanced SEO/ASO & Analytics Setup',
      'E-commerce Functionality (up to 20 products)',
      '3 Months Post-Launch Support',
      'Performance Optimization',
    ],
    isClientChoice: true, // This is the "Client's Choice" / "Popular" one
    buttonText: 'Start Your Project',
    cardGradientFrom: 'from-[#9B00FD]', // Bright purple
    cardGradientTo: 'to-[#4F00FF]', // Bright blue-purple
  },
  {
    name: 'Growth',
    webPrice: '$4999+',
    webUnit: '/project',
    mobilePrice: '$6999+', // Example mobile price
    mobileUnit: '/app',
    description: 'Comprehensive solution for complex projects and high-traffic applications.',
    features: [
      'Everything in Scale',
      'Unlimited Pages/Screens',
      'Custom Web/App Development',
      'Advanced API Integrations',
      'Enhanced Security Features',
      '6 Months Post-Launch Support',
      'Dedicated Project Manager',
    ],
    isClientChoice: false,
    buttonText: 'Consult Us',
    cardGradientFrom: 'from-[#0A0C16]', // Dark slate/blue background
    cardGradientTo: 'to-[#1B263D]', // Darker blue/purple hue
  },
];

// --- NEW DATA FOR PROJECT TIMELINE ---
const timelineSteps = [
  {
    id: 1,
    title: 'Plan',
    description: 'We define project scope, goals, and technical requirements to lay a strong foundation.',
    icon: <FiZap size={30} className="text-cyan-400" />,
  },
  {
    id: 2,
    title: 'Design',
    description: 'Crafting stunning UI/UX, wireframes, and interactive prototypes for seamless experiences.',
    icon: <FiFeather size={30} className="text-fuchsia-400" />,
  },
  {
    id: 3,
    title: 'Build',
    description: 'Developing robust, scalable, and high-performance solutions with cutting-edge technologies.',
    icon: <FiCode size={30} className="text-lime-400" />,
  },
  {
    id: 4,
    title: 'Launch',
    description: 'Seamless deployment, rigorous optimization, and comprehensive post-launch support.',
    // --- CORRECTED ICON HERE ---
    icon: <FiTarget size={30} className="text-orange-400" />,
  },
];

// --- NEW DATA FOR FAQ (NO CHANGE) ---
const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity, but a typical "Scale" level website might take 6-10 weeks from planning to launch. We provide detailed timelines in our personalized project proposals.',
  },
  {
    question: 'What is your process for client communication?',
    answer: 'We maintain transparent communication through regular check-ins, a dedicated project manager (for "Growth" plans), and collaborative tools like Slack and Notion. You\'ll always be informed about your project\'s status and milestones.',
  },
  {
    question: 'Do you offer post-launch support and maintenance?',
    answer: 'Absolutely! All our plans include dedicated post-launch support periods, ranging from 1 to 6 months. We also offer extended support and comprehensive maintenance packages to keep your platform running smoothly.',
  },
  {
    question: 'Can you integrate with existing systems and APIs?',
    answer: 'Yes, we specialize in seamless API integrations with various third-party services, CRM systems, payment gateways, and existing business infrastructures to ensure your new solution works perfectly within your ecosystem.',
  },
  {
    question: 'What if my project needs custom features not listed in your plans?',
    answer: 'Our "Growth" plan is specifically designed for highly customized and complex solutions. We encourage a detailed consultation to understand your unique requirements, and we\'ll tailor a bespoke proposal and development roadmap just for you.',
  },
];

// --- FRAMER MOTION VARIANTS (NO CHANGE) ---
const pricingCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      duration: 0.8,
      delay: 0.1,
    },
  },
  hover: {
    y: -10,
    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 25px rgba(168, 85, 247, 0.7)',
    scale: 1.03,
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.97 },
};

const toggleIndicatorVariants = {
  web: { x: '0%', backgroundColor: '#9B00FD' },
  mobile: { x: '100%', backgroundColor: '#4F00FF' },
};

// Variants for the timeline steps
const timelineStepVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.7 }, // Deeper hidden state
  show: (i: number) => ({ // Use a function to enable staggered animation
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15, // Slightly softer spring
      delay: i * 0.15, // Stagger animation more effectively
      duration: 0.7,
    },
  }),
};


// Variants for the FAQ items
const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
  expanded: {
    // No visual change on expand, just ensures it stays visible
  },
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export default function ProjectsPage() {
  const pricingControls = useAnimation();
  const [pricingRef, pricingInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const timelineControls = useAnimation();
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const ctaControls = useAnimation();
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const faqControls = useAnimation();
  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // State for open FAQ item

  useEffect(() => {
    if (pricingInView) {
      pricingControls.start('show');
    }
  }, [pricingControls, pricingInView]);

  useEffect(() => {
    if (timelineInView) {
      timelineControls.start('show');
    }
  }, [timelineControls, timelineInView]);

  useEffect(() => {
    if (ctaInView) {
      ctaControls.start('show');
    }
  }, [ctaControls, ctaInView]);

  useEffect(() => {
    if (faqInView) {
      faqControls.start('show');
    }
  }, [faqControls, faqInView]);

  const handleTabChange = (tab: 'web' | 'mobile') => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* Existing Projects Section */}
      <ProjectsSection />

      {/* Existing Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background effects for pricing section */}
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-1000"></div>
        <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 sm:mb-12 md:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9B00FD] via-[#4F00FF] to-blue-500 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Our Stellar Services
        </motion.h2>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-10 sm:mb-12 md:mb-16">
          <div className="relative bg-[#1A1E2F] p-1 rounded-full flex gap-2 border border-[#3A425F] w-full max-w-xs md:max-w-md shadow-inner shadow-black/50">
            <motion.div
              className="absolute h-[calc(100%-8px)] w-1/2 rounded-full z-0 inset-1"
              initial={false}
              animate={activeTab}
              variants={toggleIndicatorVariants}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <button
              onClick={() => handleTabChange('web')}
              className={`relative z-10 flex-1 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300
                ${activeTab === 'web' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
            >
              Web Development
            </button>
            <button
              onClick={() => handleTabChange('mobile')}
              className={`relative z-10 flex-1 px-4 py-2 sm:px-6 sm:py-2 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300
                ${activeTab === 'mobile' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
            >
              Mobile Apps
            </button>
          </div>
        </div>

        <motion.div
          ref={pricingRef}
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-8 lg:gap-12 justify-items-center"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl transition-all duration-300 ease-out
                bg-gradient-to-br ${plan.cardGradientFrom} ${plan.cardGradientTo}
                ${plan.isClientChoice
                  ? 'border border-transparent ring-2 ring-offset-2 ring-offset-black ring-[#8A2BE2] shadow-purple-900/70 scale-105'
                  : 'border border-[#3A425F] shadow-lg shadow-black/30'
                }
              `}
              variants={pricingCardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {plan.isClientChoice && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8A2BE2] to-[#4F00FF] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg border border-white/20 uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3 mt-4">
                {plan.name}
              </h3>
              <p className="text-slate-300 text-base sm:text-lg mb-6">{plan.description}</p>
              <div className="my-4">
                <span className="text-6xl sm:text-7xl font-extrabold text-white">
                  {activeTab === 'web' ? plan.webPrice : plan.mobilePrice}
                </span>
                <span className="text-xl text-slate-300 font-semibold">{activeTab === 'web' ? plan.webUnit : plan.mobileUnit}</span>
              </div>

              <div className="w-full text-left mb-8 space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-200">
                    <FaCheckCircle className="text-cyan-400 mr-3 flex-shrink-0" size={20} />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ease-out shadow-lg transform
                  ${plan.isClientChoice
                    ? 'bg-gradient-to-r from-[#4F00FF] to-[#8A2BE2] text-white hover:from-[#6A00FF] hover:to-[#A343EB] hover:scale-105 border border-white/20'
                    : 'bg-gradient-to-r from-[#1E2749] to-[#2D3A63] text-gray-100 hover:from-[#2D3A63] hover:to-[#3E4D7F] hover:scale-103 border border-[#3A425F]'
                  }
                `}
                whileHover={{ scale: plan.isClientChoice ? 1.05 : 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* NEW: Project Timeline/Process Steps Section */}
 <section id="timeline" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background effects for timeline section - more ethereal and soft */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-500"></div>
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2500"></div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 sm:mb-12 md:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Our Extraterrestrial Process
        </motion.h2>

        <div ref={timelineRef} className="relative mt-12 flex flex-col items-center">
          {/* Horizontal Line with animated glowing "progress" */}
          <motion.div
            className="absolute hidden md:block h-1 bg-gradient-to-r from-transparent via-[#8A2BE2]/50 to-transparent top-1/2 left-0 right-0 -translate-y-1/2 z-0 rounded-full"
          ></motion.div>
           <motion.div
            className="absolute hidden md:block h-[3px] bg-gradient-to-r from-[#9B00FD] to-[#4F00FF] top-1/2 left-0 -translate-y-1/2 z-10 rounded-full shadow-lg shadow-[#8A2BE2]/70"
            initial={{ width: 0 }}
            animate={timelineInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }} // Slightly longer, smoother animation
          ></motion.div>


          <div className="flex flex-col md:flex-row justify-between items-stretch relative z-20 gap-12 md:gap-4 lg:gap-8 w-full">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center w-full md:w-1/4 px-2 py-4"
                variants={timelineStepVariants}
                initial="hidden"
                animate={timelineInView ? 'show' : 'hidden'}
                custom={index}
              >
                {/* MODIFIED: Increased mb- (margin-bottom) from mb-6 to mb-10 */}
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#1A1E2F]/80 to-[#2D3A63]/80 border border-[#3A425F] shadow-xl shadow-black/50 mb-10 group transition-all duration-500 ease-out hover:scale-105 hover:shadow-purple-700/40">
                  <div className="absolute inset-2 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-all duration-300 border border-transparent group-hover:border-purple-500/50">
                    {step.icon}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    whileHover={{
                      borderColor: '#9B00FD',
                      boxShadow: '0 0 25px #9B00FD',
                      transition: { duration: 0.3 }
                    }}
                  ></motion.div>
                </div>
                {/* MODIFIED: Adjusted mb- (margin-bottom) on heading from mb-3 to mb-4 to provide more space from its own description */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 text-shadow-lg leading-tight">{step.title}</h3>
                <p className="text-slate-300 text-base sm:text-lg max-w-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Final CTA Section */}
      <section id="cta" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        {/* Background blobs for CTA - More refined colors and blend for ethereal feel */}
        <div className="absolute -top-10 left-0 w-60 h-60 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-1500"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>

        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaControls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
          }}
        >
          <motion.h2
            // Enhanced gradient for the heading, bolder text shadow
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight leading-tight drop-shadow-2xl"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
          >
            Ready to Launch Your Vision?
          </motion.h2>
          <motion.p
            // Added subtle text shadow for better contrast and depth
            className="text-lg sm:text-xl text-slate-200 mb-12 max-w-3xl mx-auto text-shadow-md"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
          >
            Let's transform your ideas into a stunning digital reality. Contact us today for a free consultation and a tailored proposal.
          </motion.p>
          <motion.button
            // More prominent button styling with a subtle continuous animation
            className="px-12 py-5 rounded-full text-xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-700 shadow-[0_15px_30px_rgba(79,0,255,0.4),_0_0_15px_rgba(79,0,255,0.7)] hover:from-purple-800 hover:to-blue-800 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            // Subtle continuous animation to draw attention
            animate={{
                y: [0, -5, 0], // Move slightly up and down
                transition: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5 // Start after initial entrance animation
                }
            }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </section>

      {/* NEW: FAQ Section */}
 <section
  id="faq"
  className="relative z-10 py-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
>
  {/* Animated ethereal blobs */}
  <div className="absolute -top-32 -right-16 w-96 h-96 bg-lime-400 opacity-20 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-1000" />
  <div className="absolute bottom-0 -left-20 w-[28rem] h-[28rem] bg-sky-400 opacity-20 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-3000" />

  {/* Optional aurora background layer */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-[0.15] z-0 pointer-events-none" />

  <motion.h2
    className="text-center text-transparent text-5xl sm:text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-lime-300 via-teal-300 to-sky-400 drop-shadow-lg mb-16 tracking-tight z-10 relative"
    initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.6 }}
  >
    Frequently Asked Questions
  </motion.h2>

  <motion.div
    ref={faqRef}
    className="space-y-8 relative z-10"
    initial="hidden"
    animate={faqControls}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
  >
    {faqs.map((faq, index) => (
      <motion.div
        key={index}
        className="relative bg-gradient-to-br from-[#1a1c2c] to-[#2b3148] border border-[#3b4369] backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl group cursor-pointer hover:shadow-cyan-500/30 transition-shadow duration-500"
        onClick={() => toggleFAQ(index)}
        variants={faqItemVariants}
        layout
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />

        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl sm:text-2xl font-semibold relative">
            {faq.question}
            <span className="block w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </h3>
          <motion.div
            initial={false}
            animate={{
              rotate: openFAQ === index ? 135 : 0,
              scale: openFAQ === index ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {openFAQ === index ? (
              <FiMinus className="text-cyan-300" size={24} />
            ) : (
              <FiPlus className="text-lime-300" size={24} />
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {openFAQ === index && (
            <motion.div
              key="answer"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={faqItemVariants}
              className="mt-5 text-slate-300 text-lg leading-relaxed tracking-wide"
            >
              {faq.answer}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </motion.div>
</section>

    </>
  );
}
