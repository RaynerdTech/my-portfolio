// app/about/page.tsx
// This is now a SERVER COMPONENT.

import { Metadata } from "next";
import AboutClientPage from "../components/AboutClientPage"; // We will import the client component

// Metadata specific to the About page - THIS IS THE CORRECT PLACE FOR IT
export const metadata: Metadata = {
  title: "About Me | Ray - Web Developer in Lagos",
  description:
    "Learn more about Ray, a passionate full-stack developer from Lagos, Nigeria. Discover my journey, my skills in Next.js and React, and my mission to help businesses succeed online.",

  openGraph: {
    title: "About Me | Ray - Web Developer in Lagos",
    description: "Learn about my journey and skills in web development.",
    // You could even use a different image here, like a professional headshot
    images: [
      "https://portfolio.raynerd.com.ng/images/raynerd-tech.jpg",
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Me | Ray - Web Developer in Lagos",
    description: "Learn about my journey and skills in web development.",
    images: [
      "https://portfolio.raynerd.com.ng/images/raynerd-tech.jpg",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  );
}
