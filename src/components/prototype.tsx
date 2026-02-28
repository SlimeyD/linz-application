'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chat from '@/components/chat';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Prototype() {
  const [isEnhancedExpanded, setIsEnhancedExpanded] = useState(false);

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-4xl font-heading font-bold text-slate-900 mb-6">Practical AI Demo</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Ask natural language questions about the LINZ District Valuation Roll — data structure, lookup codes, availability, and common issues.
          This interactive RAG system searches over seven real LINZ DVR documentation files to deliver precise, context-aware answers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex justify-center mt-12"
      >
        <Chat />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center text-sm text-slate-500 mt-8"
      >
        <span className="font-semibold">Note:</span> Built with OpenAI Assistants API and vector store file search over 7 LINZ documentation files.
      </motion.p>

      {/* Collapsible: How This Could Be Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-3xl mx-auto mt-12"
      >
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setIsEnhancedExpanded(!isEnhancedExpanded)}
        >
          <div className="flex justify-between items-center px-6 py-4">
            <h3 className="font-heading font-bold text-lg text-slate-800">
              How This Could Be Enhanced
            </h3>
            <motion.div
              initial={false}
              animate={{ rotate: isEnhancedExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-teal-700 w-5 h-5" />
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {isEnhancedExpanded && (
              <motion.div
                key="enhanced-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <span className="text-teal-700 mt-0.5">•</span>
                      <span>
                        <span className="font-medium text-slate-700">Persistent document referencing</span> — Using{' '}
                        <Link
                          href="https://docref.digital.govt.nz/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-teal-700 hover:text-teal-800 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          DocRef <ExternalLink className="h-3 w-3" />
                        </Link>, the NZ Government&apos;s persistent referencing system (DIA Service Modernisation Roadmap), to provide granular, auditable citations for LINZ datasets.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-teal-700 mt-0.5">•</span>
                      <span>
                        <span className="font-medium text-slate-700">Clickable source citations</span> — Parsing citation annotations to link directly to LINZ data dictionary sections and dataset pages.{' '}
                        <Link
                          href="https://github.com/SlimeyD/linz-application/issues/1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-teal-700 hover:text-teal-800 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          See issue <ExternalLink className="h-3 w-3" />
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-teal-700 mt-0.5">•</span>
                      <span>
                        <span className="font-medium text-slate-700">API modernisation</span> — Migration from the deprecated Assistants API to OpenAI&apos;s{' '}
                        <Link
                          href="https://platform.openai.com/docs/api-reference/responses"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-teal-700 hover:text-teal-800 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Responses API <ExternalLink className="h-3 w-3" />
                        </Link>{' '}
                        for improved citation support and long-term maintainability.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-teal-700 mt-0.5">•</span>
                      <span>
                        <span className="font-medium text-slate-700">Expanded knowledge base</span> — Extending beyond DVR to cover additional LINZ datasets (title records, survey data, geodetic marks) for broader coverage.
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
