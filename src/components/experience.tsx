'use client';

import { motion } from 'framer-motion';
import { Dot, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experienceEntries = [
  {
    title: 'AI & LLM Product Development',
    description:
      'Built a multi-model, multi-agent orchestration system coordinating Claude, GPT and Gemini, plus RAG systems using the OpenAI Assistants API. Earlier work includes Kaia the Kaka — an AR scavenger hunt for Wellington City Council using image recognition — and AI-enabled automation pipelines for message triage workflows.',
    link: { text: 'Kaia the Kaka', href: 'https://bamboocreative.nz/work/ar-scavenger-hunt/' },
  },
  {
    title: 'Product Ownership & Delivery',
    description:
      'Co-founded ratemyflat.org.nz, handling product strategy, prototyping, design artifacts and frontend delivery. As Principal at Bamboo Creative, delivered strategic digital solutions across product roadmaps and agile development cycles for clients including Wellington City Council and government agencies.',
  },
  {
    title: 'Government & Regulated Environments',
    description:
      'Developed an outcomes measurement platform for MBIE — a usable Airtable prototype enabling users to interrogate the Broader Outcomes Framework across indicators, metrics and data sources. Built two scenario modelling calculators integrating multiple government datasets for GWRC and WCC. Specified and managed development of a flight planning platform for AeroPath, a subsidiary of Airways NZ. Strong experience with the Privacy Act 2020 through regulated financial advisory work.',
  },
  {
    title: 'Data Platforms & Integration',
    description:
      'Built ratemyflat.org.nz on LINZ property data with Supabase and PostgreSQL. Designed relational databases mapping diverse government outcomes to their data sources, pulling on existing government and non-government standards, measures and data sources.',
  },
  {
    title: 'User-Centred Design Advocate',
    description:
      'A deep believer in people. I see real opportunity to equip teams with skills to become capable, productive AI users — deepening their understanding of tools, processes and what these systems can do. Desktop and targeted user research drives everything I build. Contributed to Better Work Together, a practical guide to team collaboration published by Atlassian.',
    link: { text: 'Better Work Together', href: 'https://betterworktogether.co' },
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
          {/* Vertical line */}
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
              {/* Dot for timeline */}
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
