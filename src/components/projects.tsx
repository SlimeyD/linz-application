'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projectsData = [
  {
    name: 'ratemyflat',
    icon: '/ratemyflat-icon.svg',
    description: 'Property insights platform built using LINZ data, helping renters and investors make informed decisions about New Zealand housing.',
    role: 'Co-founder & PO',
    link: 'https://ratemyflat.org.nz',
  },
  {
    name: 'Freehold',
    icon: '/freehold-icon.png',
    description: 'Socially responsible KiwiSaver and financial advice platform, making personalised, ethical investing accessible to all New Zealanders.',
    role: 'Design & Development',
    link: 'https://freehold.nz',
  },
  {
    name: 'Bamboo Creative',
    icon: '/bamboo-icon.png',
    description: 'Digital agency specialising in product design, web development, and strategic consulting for purpose-driven organisations.',
    role: 'Principal',
    link: 'https://bamboocreative.nz',
  },
];

export function Projects() {
  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-heading text-center text-slate-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Showcase Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm group"
            >
              <div className="rounded-lg overflow-hidden bg-slate-50 p-2 inline-block mb-4">
                <Image
                  src={project.icon}
                  alt={`${project.name} icon`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-heading text-2xl text-slate-900 mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-teal-700 font-medium mb-3">{project.role}</p>
              <p className="text-slate-600 text-base mb-6">
                {project.description}
              </p>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium transition-colors"
              >
                Visit site
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
