// app/components/LavaLampBlob.tsx
'use client';

import { motion } from 'framer-motion';

export const LavaLampBlob = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500 mix-blend-screen rounded-full filter blur-3xl opacity-30 animate-blob"
        style={{ top: '-100px', left: '-100px' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-500 mix-blend-screen rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        style={{ bottom: '-120px', right: '-120px' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-cyan-400 mix-blend-screen rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"
        style={{ top: '20%', left: '40%' }}
      />
    </div>
  );
};
