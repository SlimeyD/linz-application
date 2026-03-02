'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('prototype');
    if (element) {
      const navHeight = 80;
      const offsetTop = element.offsetTop - navHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const topographicPattern = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gridPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke="%236dada9" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gridPattern)" />
    </svg>
  `.replace(/\n/g, '').replace(/#/g, '%23');

  return (
    <motion.section
      id="about"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 2.5, ease: 'easeOut' as const }}
        style={{
          backgroundImage: `url("data:image/svg+xml,${topographicPattern}")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <motion.h1
          className="text-5xl md:text-6xl font-heading text-slate-900 leading-tight tracking-tight px-2 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' as const }}
        >
          Using AI to unlock public good.
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 bottom-[-15px] w-24 h-1 bg-teal-700 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '80px', opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' as const }}
          />
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' as const }}
        >
          Experienced Product Owner and AI builder with hands-on LINZ data experience. I combine a deep interest in public data with practical insights into leveraging AI to unlock its value for public good.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' as const }}
        >
          <Button
            size="lg"
            className="mt-8 px-8 py-3 text-lg bg-teal-700 hover:bg-teal-800 text-white rounded-full transition-colors shadow-md hover:shadow-lg focus-visible:ring-teal-500"
            onClick={scrollToExperience}
          >
            Check this out
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
