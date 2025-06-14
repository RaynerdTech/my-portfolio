// NO 'use client' HERE
import type { Metadata } from 'next';
import ProjectsClientPage from '../components/ProjectsClientPage';

export const metadata: Metadata = {
  // Title: Combines your name, services, and location for strong SEO.
  title: 'My Services | Ray - Web & WordPress Developer in Lagos',

  // Description: A clear, action-oriented summary of your offerings.
  description: 'Explore the web and WordPress development services offered by Ray. From starter websites to complex, scalable applications, I build digital solutions in Lagos, Nigeria to help your business grow.',

  // Keywords: Relevant terms potential clients might search for.
  keywords: ['web development nigeria', 'wordpress developer lagos', 'next.js developer', 'react developer nigeria', 'e-commerce websites', 'freelance developer lagos', 'Ray web developer'],

  openGraph: {
    // OG Title: Clear and concise for social sharing.
    title: 'Web & WordPress Development Services by Ray',
    
    // OG Description: More conversational for social media feeds.
    description: 'Ready to bring your project to life? I offer professional Web/Code and WordPress development services, tailored to fit your needs, from right here in Lagos.',
    
    // OG Image: A consistent brand image.
    images: [
      {
        url: '/images/preview.jpg', // Ensure this path is correct in your `public` folder
        width: 1200,
        height: 630,
        alt: 'Ray - Web Developer Services',
      },
    ],
    url: 'https://portfolio.raynerd.com.ng', // Replace with your actual domain
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    // Twitter Title: Catchy and direct for the Twitter platform.
    title: 'Ray - Web & WordPress Development Services in Lagos',
    
    // Twitter Description: Short and punchy to fit Twitter's style.
    description: 'From starter sites to scalable apps, I build custom digital solutions. Explore my services!',
    
    // Twitter Image: Using the same consistent image.
    images: ['https://portfolio.raynerd.com.ng/images/preview.jpg'], // Ensure this path is correct in your `public` folder
  },
};

export default function ProjectsPage() {
  return <ProjectsClientPage />;
}