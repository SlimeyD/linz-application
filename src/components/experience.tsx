'use client';

import { motion } from 'framer-motion';
import { Dot, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experienceEntries = [
  {
    title: 'Delivery Leadership & Stakeholder Management',
    description:
      'Led concurrent digital product programmes across government, not-for-profit and startup contexts \u2014 from strategy and discovery through agile delivery. Managed competing stakeholder priorities, facilitated alignment, and acted as escalation point when programmes encountered complexity. Experienced in navigating organisational change and capability gaps where technology disrupts existing service models.',
  },
  {
    title: 'Product Ownership & Agile Delivery',
    description:
      'Co-founded ratemyflat \u2014 product strategy, prototyping, design artifacts and frontend delivery built on LINZ data. Use RICE, MoSCoW and WSJF for prioritisation. Develop requirements using BDD with job stories and cucumber notation. Recently built a custom AI skill for backlog refinement that aggregates value/effort perspectives from SMEs and team members. Strong path from strategy \u2192 roadmap \u2192 user needs \u2192 requirements.',
    link: { text: 'ratemyflat.org.nz', href: 'https://ratemyflat.org.nz' },
  },
  {
    title: 'Team Enablement & Capability Building',
    description:
      'Seeded a new product team for a legal tech startup \u2014 playing CPO, hiring developers, defining product vision, delivering MVP in 4 months, then transitioning to advisory as internal capability grew. Mentored intermediate product and project managers. Advocate for Working Out Loud \u2014 sharing work openly through writing, video walkthroughs and peer coaching to build organisational capability rather than external dependency.',
  },
  {
    title: 'Government & Regulated Environments',
    description:
      'Developed a NZ Government Procurement outcomes framework aligning with Broader Outcomes and government procurement rules, GWRC/WCC emissions modelling calculators, Aeropath (Airways) NZ flight planning platform, Para Kore waste reporting (MfE). Aware of government standards and guidance including the Public Service AI Framework. Nuanced understanding of the principles and implications of the Privacy Act 2020 through regulated financial advisory work. General interest and understanding of public sector policy, process and considerations.',
  },
  {
    title: 'AI & Data Platforms',
    description:
      'Multi-model, multi-agent orchestration (Claude + Gemini + GPT), RAG systems, vector search, AI-enabled automation pipelines. Practical experience with responsible AI considerations \u2014 knowing when AI adds genuine value vs. when simpler solutions serve better.',
    link: { text: 'My first AI project \u2014 using OCR', href: 'https://www.bamboocreative.nz/case-studies/kaia-the-kaka' },
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-heading text-center text-slate-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Experience Highlights
        </motion.h2>

        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-3 md:left-5 top-0 h-full border-l-2 border-teal-200" />

          {experienceEntries.map((entry, index) => (
            <motion.div
              key={index}
              className="mb-10 flex relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            >
              <div className="absolute -left-3 md:-left-5 top-0 z-10 p-1 bg-white rounded-full">
                <Dot className="h-6 w-6 text-teal-700 bg-teal-700 rounded-full" />
              </div>
              <div className="flex-1 ml-4 md:ml-8">
                <h3 className="font-heading text-xl md:text-2xl text-slate-800 mb-2">
                  {entry.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                  {entry.description}
                </p>
                {entry.link && (
                  <Link
                    href={entry.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-teal-700 hover:text-teal-800 font-medium text-sm transition-colors"
                  >
                    {entry.link.text} <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
