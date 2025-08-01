✅ Checkpoint: Debugging a React Application
Project Used: My personal portfolio website built with Next.js, using React, TailwindCSS, and Framer Motion.

🔧 Debugging Process
1. Project Setup
I used my ongoing Next.js portfolio project as the sample React application. It contains multiple components that use state and props, including tab navigation, animated call-to-action sections, and FAQ toggles.

2. Installed Developer Tools
Installed React Developer Tools browser extension (Chrome).

Used it to inspect the live component tree, props, and state values.

3. Component Tree Inspection
Using React Developer Tools, I inspected the component structure and identified key components with state and prop usage:

ProjectsPage

Tabs (props/state toggle)

FAQSection (uses state to toggle visibility)

CTASection (uses useEffect, useInView, and useAnimation)

🐛 Issues Identified & Fixes Applied
🔹 Issue 1: Missing Imports
Error: useState, useEffect, useInView, and useAnimation were being used but not imported.

Fix:

js
Copy
Edit
import { useState, useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
🔹 Issue 2: Undefined Variable (faqs)
Error: The FAQ component tried to map over faqs, which was not defined.

Fix:

js
Copy
Edit
const faqs = [
  { question: "What services do you offer?", answer: "Web and mobile app development, UI/UX design, SEO and more." },
  { question: "How long does a project take?", answer: "Typically 2–6 weeks depending on scope." }
];
🔹 Issue 3: Animation Not Triggering
Cause: Scroll-based animations weren't triggering as expected.

Fix: Adjusted the useInView threshold and confirmed that the ref was correctly passed to the motion.div.

js
Copy
Edit
const [ref, inView] = useInView({ threshold: 0.5 });
✅ Verification & Results
All components now render without errors or warnings.

FAQ toggles now work as expected.

CTA animations trigger correctly on scroll.

Tabs switch correctly between project categories.

Verified correct props and state using React Developer Tools.

🧾 Conclusion
I successfully used React Developer Tools to debug a real-world React (Next.js) application. By inspecting the component tree, monitoring state and props, and testing interactivity, I identified and resolved key issues affecting functionality and rendering.

All bugs were fixed, and the app now functions as expected.
