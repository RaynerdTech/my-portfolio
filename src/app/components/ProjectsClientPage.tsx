'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { FiZap, FiFeather, FiCode, FiTarget, FiPlus, FiMinus } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import type { JSX } from 'react';

// Assuming these components are correctly located
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';

// --- Type Definitions ---
interface PricingPlan {
  name: string;
  webPrice: string;
  webUnit: string;
  WordPressPrice: string;
  mobileUnit: string;
  description: string;
  features: string[];
  isClientChoice: boolean;
  buttonText: string;
  cardGradientFrom: string;
  cardGradientTo: string;
}

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface FAQItem {
  question: string;
  answer: string;
}

const pricingPlans: PricingPlan[] = [
    {
        name: 'Starter',
        webPrice: '₦250k',
        webUnit: '/project',
        WordPressPrice: '₦200k',
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
        cardGradientFrom: 'from-[#0A0C16]',
        cardGradientTo: 'to-[#1B263D]',
    },
    {
        name: 'Scale',
        webPrice: '₦500k',
        webUnit: '/project',
        WordPressPrice: '₦400k',
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
        isClientChoice: true,
        buttonText: 'Start Your Project',
        cardGradientFrom: 'from-[#9B00FD]',
        cardGradientTo: 'to-[#4F00FF]',
    },
    {
        name: 'Growth',
        webPrice: '₦1M+',
        webUnit: '/project',
        WordPressPrice: '₦850k+',
        mobileUnit: '/app',
        description: 'Comprehensive solution for complex projects and high-traffic applications.',
        features: [
            'Everything in Scale',
            'Unlimited Pages/Screens',
            'Custom Web',
            'Advanced API Integrations',
            'Enhanced Security Features',
            '6 Months Post-Launch Support',
            'Dedicated Project Manager',
        ],
        isClientChoice: false,
        buttonText: 'Consult Us',
        cardGradientFrom: 'from-[#0A0C16]',
        cardGradientTo: 'to-[#1B263D]',
    },
];

const timelineSteps: TimelineStep[] = [
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
        icon: <FiTarget size={30} className="text-orange-400" />,
    },
];

const faqs: FAQItem[] = [
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

const timelineStepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.7 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 15,
            delay: i * 0.15,
            duration: 0.7,
        },
    }),
};

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
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
};



export default function ProjectsClientPage() {
    const pricingControls = useAnimation();
    const [, pricingInView] = useInView({
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

    const contactSectionRef = useRef<HTMLDivElement>(null);

    const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

    const scrollToContact = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <ProjectsSection />

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* ... (rest of the pricing JSX) ... */}
                 <div className="absolute top-10 right-[15%] w-60 h-60 md:w-80 md:h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-1000" />
                 <div className="absolute -bottom-5 left-[15%] w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000" />

                 <motion.h2
                     className="text-[2.5rem] leading-tight xs:text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-7xl font-extrabold mb-8 sm:mb-10 md:mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9B00FD] via-[#4F00FF] to-blue-500 tracking-tight"
                     style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: "1.2" }}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6 }}
                 >
                     Our Stellar Services
                 </motion.h2>

                 <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                     <div className="relative bg-[#1A1E2F] p-0.5 rounded-full flex gap-1 border border-[#3A425F] w-full max-w-[280px] sm:max-w-xs md:max-w-md shadow-inner shadow-black/50">
                         <motion.div
                             className="absolute h-[calc(100%-4px)] w-1/2 rounded-full z-0 inset-0.5 bg-gradient-to-r from-[#4F00FF] to-[#8A2BE2]"
                             initial={false}
                             animate={activeTab}
                             variants={{
                                 web: { x: 0 },
                                 mobile: { x: "100%" },
                             }}
                             transition={{ type: "spring", stiffness: 400, damping: 30 }}
                         />
                         <button
                             onClick={() => handleTabChange("web")}
                             className={`relative z-10 flex-1 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors duration-200 ${activeTab === "web" ? "text-white" : "text-gray-300 hover:text-white"}`}
                         >
                             Web/Code
                         </button>
                         <button
                             onClick={() => handleTabChange("mobile")}
                             className={`relative z-10 flex-1 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors duration-200 ${activeTab === "mobile" ? "text-white" : "text-gray-300 hover:text-white"}`}
                         >
                             WordPress
                         </button>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 justify-items-center">
                     <AnimatePresence>
                         {pricingPlans.map((plan) => (
                             <motion.div
                                 key={`${activeTab}-${plan.name}`}
                                 className={`relative w-full sm:max-w-[360px] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col items-center text-center shadow-lg bg-gradient-to-br ${plan.cardGradientFrom} ${plan.cardGradientTo} ${plan.isClientChoice ? "border-2 border-purple-400/50 ring-1 ring-white/10 shadow-purple-500/30 md:scale-[1.02]" : "border border-[#3A425F] shadow-black/20"} transition-transform duration-300 ease-out hover:shadow-xl`}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -20 }}
                                 whileHover={{ scale: 1.05, y: -5 }}
                                 transition={{ type: "spring", stiffness: 250, damping: 20 }}
                             >
                                 {plan.isClientChoice && (
                                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8A2BE2] to-[#4F00FF] text-white text-[0.7rem] xs:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow border border-white/10 uppercase tracking-wider">
                                         Most Popular
                                     </div>
                                 )}
                                 <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-white mt-4 mb-1 sm:mb-2">{plan.name}</h3>
                                 <p className="text-slate-300 text-sm sm:text-base md:text-[1.05rem] mb-4 sm:mb-5">{plan.description}</p>
                                 <div className="my-3 sm:my-4 flex flex-wrap justify-center items-baseline gap-1">
                                     <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white break-words">{activeTab === "web" ? plan.webPrice : plan.WordPressPrice}</span>
                                     <span className="text-lg sm:text-xl text-slate-300 font-medium">{activeTab === "web" ? plan.webUnit : plan.mobileUnit}</span>
                                 </div>
                                 <ul className="w-full text-left mb-5 sm:mb-6 space-y-2 sm:space-y-3">
                                     {plan.features.map((feature, index) => (
                                         <li key={index} className="flex items-start text-slate-200 text-sm sm:text-base md:text-[1.05rem]">
                                             <FaCheckCircle className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                             <span>{feature}</span>
                                         </li>
                                     ))}
                                 </ul>
                                 <button onClick={scrollToContact} className={`w-full py-2 sm:py-2.5 px-4 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-out shadow-md mt-auto ${plan.isClientChoice ? "bg-gradient-to-r from-[#4F00FF] to-[#8A2BE2] text-white hover:brightness-110" : "bg-[#1E2749] text-gray-100 hover:bg-[#2D3A63]"}`}>
                                     {plan.buttonText}
                                 </button>
                             </motion.div>
                         ))}
                     </AnimatePresence>
                 </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
                 {/* ... (rest of the timeline JSX) ... */}
                 <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-500"></div>
                 <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-2500"></div>

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
                     <motion.div className="absolute hidden md:block h-1 bg-gradient-to-r from-transparent via-[#8A2BE2]/50 to-transparent top-1/2 left-0 right-0 -translate-y-1/2 z-0 rounded-full"></motion.div>
                     <motion.div
                         className="absolute hidden md:block h-[3px] bg-gradient-to-r from-[#9B00FD] to-[#4F00FF] top-1/2 left-0 -translate-y-1/2 z-10 rounded-full shadow-lg shadow-[#8A2BE2]/70"
                         initial={{ width: 0 }}
                         animate={timelineInView ? { width: '100%' } : { width: 0 }}
                         transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
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
                                 <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#1A1E2F]/80 to-[#2D3A63]/80 border border-[#3A425F] shadow-xl shadow-black/50 mb-10 group transition-all duration-500 ease-out hover:scale-105 hover:shadow-purple-700/40">
                                     <div className="absolute inset-2 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-all duration-300 border border-transparent group-hover:border-purple-500/50">
                                         {step.icon}
                                     </div>
                                     <motion.div
                                         className="absolute inset-0 rounded-full border-2 border-transparent"
                                         whileHover={{ borderColor: '#9B00FD', boxShadow: '0 0 25px #9B00FD', transition: { duration: 0.3 } }}
                                     ></motion.div>
                                 </div>
                                 <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 text-shadow-lg leading-tight">{step.title}</h3>
                                 <p className="text-slate-300 text-base sm:text-lg max-w-xs leading-relaxed">{step.description}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
                {/* ... (rest of the CTA JSX) ... */}
                <div className="absolute -top-10 left-0 w-60 h-60 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-1500"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
                <motion.div
                    ref={ctaRef}
                    initial="hidden"
                    animate={ctaControls}
                    variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } } }}
                >
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight leading-tight drop-shadow-2xl"
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                    >
                        Ready to Launch Your Vision?
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl text-slate-200 mb-12 max-w-3xl mx-auto text-shadow-md"
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
                    >
                        Let&#39;s transform your ideas into a stunning digital reality. Contact us today for a free consultation and a tailored proposal.
                    </motion.p>
                    <motion.button
                        onClick={scrollToContact}
                        className="px-12 py-5 rounded-full text-xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-700 shadow-[0_15px_30px_rgba(79,0,255,0.4),_0_0_15px_rgba(79,0,255,0.7)] hover:from-purple-800 hover:to-blue-800 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                            y: [0, -5, 0],
                            transition: {
                                duration: 4,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: 0.5
                            }
                        }}
                    >
                        Start Your Project
                    </motion.button>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative z-10 py-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
                {/* ... (rest of the FAQ JSX) ... */}
                <div className="absolute -top-32 -right-16 w-96 h-96 bg-lime-400 opacity-15 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-1000" />
                <div className="absolute bottom-0 -left-20 w-[28rem] h-[28rem] bg-sky-400 opacity-15 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-3000" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-[0.10] z-0 pointer-events-none" />
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
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gradient-to-br from-[#1a1c2c] to-[#2b3148] border border-[#3b4369] backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl group cursor-pointer hover:shadow-cyan-500/30 transition-shadow duration-500"
                            variants={faqItemVariants}
                            layout
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-xl sm:text-2xl font-semibold relative" id={`faq-question-${index}`}>
                                    {faq.question}
                                    <span className="block w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                                </h3>
                                <motion.button
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openFAQ === index}
                                    aria-controls={`faq-answer-${index}`}
                                    className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-2 -my-2 -mr-2"
                                    initial={false}
                                    animate={{ rotate: openFAQ === index ? 135 : 0, scale: openFAQ === index ? 1.1 : 1 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                >
                                    {openFAQ === index ? <FiMinus className="text-cyan-300" size={24} /> : <FiPlus className="text-lime-300" size={24} />}
                                </motion.button>
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
                                        id={`faq-answer-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-question-${index}`}
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <div ref={contactSectionRef}>
                <ContactSection />
            </div>
        </>
    );
}