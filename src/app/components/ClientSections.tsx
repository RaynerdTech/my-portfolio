// app/components/ClientSections.tsx
'use client'; // This directive makes this file a Client Component

import dynamic from 'next/dynamic';
import { ProjectsSection } from './ProjectsSection';

// Dynamically import ParticleBackground with SSR disabled
const DynamicParticleBackground = dynamic(
  () => import('./ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
);

// Dynamically import AboutSection with SSR disabled
const DynamicAboutSection = dynamic(
  () => import('./AboutSection').then((mod) => mod.AboutSection),
  { ssr: false }
);

// Dynamically import ContactSection with SSR disabled
const DynamicContactSection = dynamic(
  () => import('./ContactSection').then((mod) => mod.ContactSection),
  { ssr: false }
);

export function ClientSections() {
  return (
    <>
      {/* Render the dynamically loaded ParticleBackground here */}
      <DynamicParticleBackground />
      <DynamicAboutSection />
      <ProjectsSection /> {/* Render ProjectsSection here */}
      <DynamicContactSection />
    </>
  );
}