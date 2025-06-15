'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import type { JSX } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// Icon components (unchanged)
const LinkedInIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.529-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const LinkedInIcon = React.memo(LinkedInIconComponent);
LinkedInIcon.displayName = 'LinkedInIcon';

const GitHubIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.743.084-.729.084-.729 1.192.086 1.815 1.293 1.815 1.293 1.052 1.815 2.748 1.292 3.413.997.107-.775.418-1.292.762-1.594-2.61-.295-5.066-1.309-5.066-5.827 0-1.292.465-2.355 1.235-3.189-.124-.295-.535-1.503.116-3.141 0 0 1-.312 3.264 1.205 1.0-.279 2.06-.417 3.11-.421 1.05.004 2.11.142 3.11.421 2.262-1.517 3.262-1.205 3.262-1.205.651 1.639.24 2.846.118 3.141.77.834 1.235 1.902 1.235 3.189 0 4.53-2.451 5.523-5.075 5.812.381.324.711.979.711 1.974v2.929c0 .319.192.694.801.576c4.765-1.589 8.197-6.086 8.197-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const GitHubIcon = React.memo(GitHubIconComponent);
GitHubIcon.displayName = 'GitHubIcon';

const XTwitterIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.415 0-6.184 2.769-6.184 6.183 0 .484.055.955.158 1.404-5.147-.259-9.733-2.728-12.777-6.49-.533.917-.84 1.97-.84 3.292 0 2.275 1.166 4.288 2.935 5.464-.86-.026-1.657-.267-2.364-.65v.079c0 2.986 2.072 5.485 4.823 6.079-.42.112-.86.17-1.312.17-.321 0-.631-.031-.933-.086.766 2.384 2.983 4.135 5.631 4.182-2.049 1.603-4.634 2.56-7.408 2.56-.482 0-.958-.029-1.424-.083 2.929 1.869 6.039 2.95 9.576 2.95 11.486 0 17.77-9.522 17.77-17.77s-.27-3.117-1.444-4.286z"/></svg>
);
const XTwitterIcon = React.memo(XTwitterIconComponent);
XTwitterIcon.displayName = 'XTwitterIcon';

const InstagramIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.646.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.668-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.668-.072-4.947c-.196-4.354-2.617-6.782-6.979-6.979-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const InstagramIcon = React.memo(InstagramIconComponent);
InstagramIcon.displayName = 'InstagramIcon';

const MailIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.728v14.441h24v-14.441l-12 9.728z"/></svg>
);
const MailIcon = React.memo(MailIconComponent);
MailIcon.displayName = 'MailIcon';

const PhoneIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22.923l-3.337-3.337c-1.077-.96-2.529-1.237-3.863-.787l-1.332.444c-2.359.786-4.908.455-7.071-1.707l-1.797-1.797c-2.163-2.163-2.494-4.712-1.708-7.071l.444-1.332c.451-1.334.174-2.786-.786-3.863l-3.337-3.337c-2.929-2.929-2.859-7.712.188-10.639l1.797-1.797c.563-.563 1.464-.679 2.124-.265l4.316 2.158c.849.424 1.411 1.258 1.579 2.21l.444 2.667c.121.728-.063 1.488-.518 2.083l-1.333 1.333c-.76.76-.693 2.054.148 2.729l2.802 2.802c.675.842 1.969.908 2.729.148l1.333-1.333c.595-.455 1.355-.639 2.083-.518l2.667.444c.952.168 1.786.73 2.21 1.579l2.158 4.316c.414.66.298 1.561-.265 2.124l-1.797 1.797c-2.927 3.047-7.71 3.118-10.639.188z"/></svg>
);
const PhoneIcon = React.memo(PhoneIconComponent);
PhoneIcon.displayName = 'PhoneIcon';

const LocationIconComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.802 8.397 8 16.398 4.198-8.001 8-12.2 8-16.398 0-4.199-3.802-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
);
const LocationIcon = React.memo(LocationIconComponent);
LocationIcon.displayName = 'LocationIcon';

const ICON_COMPONENTS: { [key: string]: React.MemoExoticComponent<() => JSX.Element> } = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  twitter: XTwitterIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
};

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/raynerd-tech-703101288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
  { name: 'GitHub', icon: 'github', url: 'https://github.com/RaynerdTech' },
  { name: 'X (Twitter)', icon: 'twitter', url: 'https://x.com/raynerdtech?s=21' },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/techraynerd?igsh=Y3F5azFkdzBjbzcz&utm_source=qr' },
];

const CONTACT_INFO = [
  { type: 'Email', value: 'raynerdtech@gmail.com', icon: 'mail' },
  { type: 'Phone', value: '+234 802 298 2025', icon: 'phone' },
  { type: 'Location', value: 'Lagos, Nigeria', icon: 'location' },
];

export const ContactSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [state, handleSubmit] = useForm("mblyodye");
  const formRef = useRef<HTMLFormElement>(null);

  // Track if form was just submitted successfully
  const [justSubmitted, setJustSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJustSubmitted(false);
    await handleSubmit(e);

    // Reset form after successful submission
    if (formRef.current) {
      // Wait for Formspree to update state.succeeded
      setTimeout(() => {
        if (state.succeeded) {
          formRef.current?.reset();
          setJustSubmitted(true);
        }
      }, 100);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If state.succeeded changes, clear form (for direct Formspree triggers)
  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
      setJustSubmitted(true);
    }
  }, [state.succeeded]);

  return (
    <section id="contact" className="relative z-10 py-16 px-4 sm:py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-20 hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-700 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-0"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-500 to-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <motion.h2
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-10 sm:mb-16 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 drop-shadow-lg">
          Let&apos;s Create Something Amazing
        </span>
        <span className="block text-base sm:text-lg text-slate-400 font-normal mt-3 sm:mt-4 animate-pulse">
          Connect with me for collaborations, inquiries, or just to say hello.
        </span>
      </motion.h2>

      {/* Main container for the two columns */}
      <div className="relative p-2 rounded-4xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 shadow-inner-xl border border-slate-700/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 items-stretch justify-center rounded-3xl overflow-hidden">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 flex flex-col gap-5 sm:gap-7 relative z-10 lg:rounded-r-none lg:border-r border-slate-700/50"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={onSubmit}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 sm:mb-4 text-center lg:text-left">
              Send a Message
            </h3>

            {isClient ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-slate-200 text-base sm:text-lg font-medium">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="bg-slate-800/60 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:ring-3 focus:ring-blue-500/70 border border-transparent hover:border-blue-500/30 transition-all duration-200 placeholder-slate-400 text-base sm:text-lg"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-slate-200 text-base sm:text-lg font-medium">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="bg-slate-800/60 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:ring-3 focus:ring-blue-500/70 border border-transparent hover:border-blue-500/30 transition-all duration-200 placeholder-slate-400 text-base sm:text-lg"
                      placeholder="Your Email"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-slate-200 text-base sm:text-lg font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="bg-slate-800/60 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 resize-y focus:outline-none focus:ring-3 focus:ring-blue-500/70 border border-transparent hover:border-blue-500/30 transition-all duration-200 placeholder-slate-400 text-base sm:text-lg"
                    placeholder="Tell me about your project or simply say hello!"
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="mt-4 sm:mt-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
                
                {(state.succeeded || justSubmitted) && (
                  <motion.p
                    className="mt-3 sm:mt-4 text-center text-base sm:text-xl font-semibold text-green-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Thanks for your message! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </>
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-slate-500">
                Loading form...
              </div>
            )}
          </motion.form>

          {/* Social Media & Contact Info */}
          <motion.div
            className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 flex flex-col gap-6 sm:gap-8 relative z-10 lg:rounded-l-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 sm:mb-4 text-center lg:text-right">
              Find Me Online
            </h3>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = ICON_COMPONENTS[link.icon];
                return IconComponent ? (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 sm:p-4 rounded-full bg-slate-800 text-blue-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 shadow-md hover:shadow-xl"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.name}
                  >
                    {isClient && <IconComponent />}
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                ) : null;
              })}
            </div>

            {/* Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-slate-500">
                <span className="bg-slate-900/80 px-3 sm:px-4 text-base sm:text-lg">Or Directly</span>
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {CONTACT_INFO.map((info) => {
                const IconComponent = ICON_COMPONENTS[info.icon];
                return IconComponent ? (
                  <motion.div
                    key={info.type}
                    className="flex items-center gap-3 sm:gap-4 text-slate-300 text-base sm:text-lg p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/60 transition duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (info.type === 'Email') window.location.href = `mailto:${info.value}`;
                      if (info.type === 'Phone') window.location.href = `tel:${info.value.replace(/\s/g, '')}`;
                    }}
                  >
                    <span className="text-blue-400 flex-shrink-0">
                      {isClient && <IconComponent />}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200 text-base sm:text-lg">{info.type}</span>
                      <span className="text-slate-400 text-sm sm:text-base">{info.value}</span>
                    </div>
                  </motion.div>
                ) : null;
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};