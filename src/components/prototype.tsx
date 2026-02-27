'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Chat from '@/components/chat';

export default function Prototype() {
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
    </section>
  );
}
