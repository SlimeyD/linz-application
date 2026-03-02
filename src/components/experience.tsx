'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experienceEntries = [
  {
    title: 'AI Product Development',
    description:
      'I have extensive experience developing AI-enhanced products and workflows. I built a multi-model, multi-agent orchestration system coordinating Claude, GPT, and Gemini agents for model-specific tasks and strengths. My work includes content pipelines and automations, and I proactively share insights, tools, and approaches. My first AI-enhanced product, Kaia the K\u0101k\u0101, was an enhanced reality (ER) scavenger hunt using OCR. I\u2019m particularly interested in how agentic AI can improve team coordination and collaboration.',
    link: { text: 'Kaia the K\u0101k\u0101', href: 'https://www.bamboocreative.nz/case-studies/kaia-the-kaka' },
  },
  {
    title: 'Product Ownership & Delivery',
    description:
      'I manage the full SDLC, encompassing user and stakeholder needs analysis and validation, product strategy, planning, budget and resource coordination, team composition, and prioritised agile delivery. I excel at engaging stakeholders and end-users, integrating them into product definition, testing, and iteration to deliver tangible business outcomes.',
  },
  {
    title: 'Government & Regulated Environments',
    description:
      'I led a project to develop an outcomes measurement framework and tool for NZ Government Procurement, in partnership with Auckland Transport, Beca, Amotai, and others. I built two emissions scenario modelling calculators integrating various datasets for Greater Wellington Regional Council (GWRC) and Wellington City Council (WCC). I also specified, designed, and managed development of a flight planning platform for AeroPath, a subsidiary of Airways NZ. I have a strong understanding of the Privacy Act 2020, privacy principles, and other key aspects of NZ regulation.',
  },
  {
    title: 'People & Stakeholders',
    description:
      'I like people. I\u2019m interested in their experiences, needs and jobs to be done. This genuine curiosity and capacity to listen and reflect enables me to build trust, identify gaps and create alignment around objectives, risks and trade-offs. I\u2019m comfortable designing and facilitating workshops in person and online, synthesising insights into formats that feed directly into project planning and continuous improvement. Well versed in the constraints of design and development, I translate needs and concerns between stakeholders and gain satisfaction from equipping people to become capable, productive AI users.',
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

        <div className="relative pl-10 md:pl-12">
          <div className="absolute left-[11px] md:left-[13px] top-0 h-full w-0.5 bg-teal-200" />

          {experienceEntries.map((entry, index) => (
            <motion.div
              key={index}
              className="mb-10 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            >
              <div className="absolute -left-10 md:-left-12 top-1.5 z-10 flex items-center justify-center w-6 h-6 md:w-7 md:h-7">
                <div className="w-3 h-3 bg-teal-700 rounded-full ring-4 ring-white" />
              </div>
              <div>
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
