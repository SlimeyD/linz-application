'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Database, Bot, Code, LayoutDashboard, Cloud,
  ChevronDown, GitCommit, Users, Split
} from 'lucide-react';

const DiagramNode = ({ icon, label, subLabel }: { icon: React.ReactNode; label: string; subLabel?: string }) => (
  <div className="flex flex-col items-center justify-center text-center p-4 min-w-32 lg:min-w-40 bg-slate-800 rounded-lg border border-teal-700/50 shadow-md h-28 lg:h-32">
    <div className="mb-2 text-teal-400">{icon}</div>
    <h4 className="font-semibold text-slate-100 text-sm lg:text-base">{label}</h4>
    {subLabel && <p className="text-xs text-slate-400 mt-1">{subLabel}</p>}
  </div>
);

const Arrow = ({ direction = 'right', label = '', className = '' }: { direction?: 'right' | 'down'; label?: string; className?: string }) => {
  if (direction === 'right') {
    return (
      <div className={`relative flex items-center justify-center w-10 h-6 ${className}`}>
        <div className="bg-teal-700 w-full h-0.5" />
        <div className="absolute w-2 h-2 border-t border-r border-teal-700 transform rotate-45 -right-0.5 top-1/2 -translate-y-1/2" />
        {label && <span className="absolute text-xs text-slate-400 whitespace-nowrap -top-4 left-1/2 -translate-x-1/2">{label}</span>}
      </div>
    );
  }
  return (
    <div className={`relative flex flex-col items-center justify-center w-6 h-10 ${className}`}>
      <div className="bg-teal-700 h-full w-0.5" />
      <div className="absolute w-2 h-2 border-r border-b border-teal-700 transform rotate-45 -bottom-0.5 left-1/2 -translate-x-1/2" />
      {label && <span className="absolute text-xs text-slate-400 whitespace-nowrap left-full top-1/2 -translate-y-1/2 ml-2">{label}</span>}
    </div>
  );
};

interface PatternCardProps {
  title: string;
  icon: React.ReactNode;
  summary: string;
  description: string;
  usedFor: string;
}

const PatternCard = ({ title, icon, summary, description, usedFor }: PatternCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="text-teal-700 mr-3">{icon}</div>
          <h4 className="font-heading font-bold text-lg text-slate-800">{title}</h4>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-slate-400 w-5 h-5" />
        </motion.div>
      </div>

      <p className="text-slate-600 text-sm">{summary}</p>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 mt-4 mb-3 text-sm leading-relaxed">{description}</p>
            <p className="text-sm font-medium text-teal-700">Used for: {usedFor}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const responsibleAiItems = [
  {
    title: 'Public Service AI Framework',
    description: "Aligned with the NZ Government\u2019s framework for responsible AI adoption in public services.",
  },
  {
    title: 'Knowing When Not to Use AI',
    description: 'The most important AI skill is recognising when simpler, proven solutions serve users better.',
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Designing AI systems where human oversight is a feature, not an afterthought \u2014 especially for decisions affecting New Zealanders.',
  },
  {
    title: 'Data Governance & Privacy',
    description: 'Practical understanding of Privacy Act 2020 implications and data sovereignty considerations for government AI systems.',
  },
];

export default function AiApproach() {
  return (
    <section id="approach" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-heading text-center text-slate-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          How I Think About AI
        </motion.h2>

        {/* System Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl text-center text-slate-700 mb-2">How I Built This</h3>
          <p className="text-center text-slate-500 mb-8 text-sm">
            Multi-model AI orchestration (Claude + Gemini) was used to build the site itself.
          </p>

          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 overflow-x-auto">
            <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center lg:gap-3">
              <DiagramNode icon={<FileText size={22} />} label="Knowledge Docs" subLabel="7 markdown files" />
              <Arrow direction="down" className="lg:hidden" />
              <Arrow direction="right" className="hidden lg:flex" />

              <DiagramNode icon={<Database size={22} />} label="Vector Store" subLabel="embeddings + search" />
              <Arrow direction="down" className="lg:hidden" />
              <Arrow direction="right" className="hidden lg:flex" />

              <DiagramNode icon={<Bot size={22} />} label="Assistants API" subLabel="OpenAI" />
              <Arrow direction="down" className="lg:hidden" />
              <Arrow direction="right" className="hidden lg:flex" />

              <DiagramNode icon={<Code size={22} />} label="API Route" subLabel="/api/chat (streaming)" />
              <Arrow direction="down" className="lg:hidden" />
              <Arrow direction="right" className="hidden lg:flex" />

              <DiagramNode icon={<LayoutDashboard size={22} />} label="Next.js 16" subLabel="React + Tailwind" />
              <Arrow direction="down" className="lg:hidden" />
              <Arrow direction="right" className="hidden lg:flex" />

              <DiagramNode icon={<Cloud size={22} />} label="Vercel" subLabel="hosting" />
            </div>
          </div>
        </motion.div>

        {/* AI Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl text-center text-slate-700 mb-8">AI Patterns I Use</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sequential Pipeline',
                icon: <GitCommit size={22} />,
                summary: 'Plan \u2192 Execute \u2192 Review \u2192 Iterate. Each step validates the previous, with human checkpoints between phases.',
                description: 'Complex tasks are broken into dependent steps where output feeds the next stage. Each step includes validation \u2014 often with a human-in-the-loop checkpoint \u2014 allowing correction before proceeding. This balances automation with oversight.',
                usedFor: 'feature implementation, bug fixes, content generation.',
              },
              {
                title: 'Council of Experts',
                icon: <Users size={22} />,
                summary: 'Parallel specialist agents analyse the same problem through different lenses.',
                description: 'Multiple AI agents \u2014 each with a distinct focus (UX, security, performance, accessibility) \u2014 independently analyse the same codebase or problem. Their reports are consolidated to find agreement, resolve conflicts, and surface blind spots that a single perspective would miss.',
                usedFor: 'code review, website audits, architecture decisions.',
              },
              {
                title: 'Dispatch & Consolidate',
                icon: <Split size={22} />,
                summary: 'Independent tasks delegated to parallel agents, results reviewed and merged.',
                description: 'A dispatcher assigns independent sub-tasks to specialised worker agents, each with specific context and output format. A consolidator then reviews, validates against source material, and merges into a coherent output. This was used extensively to build this very site.',
                usedFor: 'research, content writing, multi-file changes.',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PatternCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Responsible AI in Government */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl text-center text-slate-700 mb-8">Responsible AI in Government</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsibleAiItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <h4 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
