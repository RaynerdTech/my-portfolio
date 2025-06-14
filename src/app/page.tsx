// app/page.tsx

import { Metadata } from 'next';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ParticleBackground } from './components/ParticleBackground';

// This 'metadata' object is the new way to handle <head> tags in the App Router.
export const metadata: Metadata = {
  // Main SEO tags
  title: 'Ray | Expert Next.js Developer & SEO Specialist in Lagos, Nigeria',
  description: 'I build high-performance, SEO-optimized websites for Nigerian & international businesses using Next.js, React, Node.js and TailwindCSS. Let\'s grow your brand online.',
  authors: [{ name: 'Ray', url: 'https://portfolio.raynerd.com.ng' }],

  // As discussed, the 'keywords' tag has very little SEO value, 
  // but this is the correct syntax if you choose to include it.
  keywords: ['web developer Lagos', 'freelance developer Nigeria', 'SEO expert Lagos', 'Next.js developer Nigeria', 'React developer Lagos'],
  
  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Ray | High-Performance Web Developer in Lagos',
    description: 'Helping businesses grow with fast, SEO-friendly websites built with Next.js.',
    url: 'https://portfolio.raynerd.com.ng',
    siteName: 'Ray\'s Portfolio',
    images: [
      {
        url: 'https://portfolio.raynerd.com.ng/images/preview.jpg', // Must be an absolute URL in production
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Ray | High-Performance Web Developer in Lagos',
    description: 'Helping businesses grow with fast, SEO-friendly websites built with Next.js.',
    images: ['https://portfolio.raynerd.com.ng/images/preview.jpg'], // Must be an absolute URL in production
  },
};


// Your page component remains the same, just without the <Head> component.
export default function Home() {
  return (
    <>
      <ParticleBackground />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}