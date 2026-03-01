'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Why LINZ', href: '#why-linz' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Prototype', href: '#prototype' },
  { name: 'Approach', href: '#approach' },
  { name: 'Contact', href: '#contact' },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navHeightPx = 80;
  const navHeight = `${navHeightPx}px`;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${navHeightPx - 1}px 0px -75% 0px`,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    links.forEach((link) => {
      const targetElement = document.getElementById(link.href.substring(1));
      if (targetElement) {
        observer.observe(targetElement);
      }
    });

    return () => {
      links.forEach((link) => {
        const targetElement = document.getElementById(link.href.substring(1));
        if (targetElement) {
          observer.unobserve(targetElement);
        }
      });
    };
  }, [navHeightPx]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - navHeightPx;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200"
      style={{ height: navHeight }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, 'about')}
          className="text-2xl font-heading text-slate-900 hover:text-teal-700 transition"
        >
          Damian Sligo-Green
        </a>

        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href.substring(1))}
              className={`relative text-slate-600 hover:text-teal-700 transition px-2 py-1
                ${activeSection === link.href.substring(1) ? 'text-teal-700 font-semibold' : ''}`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-teal-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-teal-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 absolute top-full left-0 right-0 shadow-lg"
          >
            <div className="flex flex-col items-start px-4 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href.substring(1))}
                  className={`block w-full text-slate-700 hover:text-teal-700 py-2 px-3 rounded-md transition
                    ${activeSection === link.href.substring(1) ? 'bg-teal-50 text-teal-700 font-semibold' : ''}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
