'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="mb-8 inline-block"
        >
          <Image
            src="/damian.jpg"
            alt="Damian Sligo-Green"
            width={160}
            height={160}
            className="rounded-full border-4 border-teal-600 mx-auto object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-300 text-lg max-w-2xl mx-auto mb-8"
        >
          Thank you for considering my application. I look forward to the opportunity to discuss how my skills and passion can contribute to the impactful work at LINZ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          <Link
            href="https://github.com/SlimeyD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Github className="w-5 h-5" /> GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/damian-sligo-green"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </Link>
          <Link
            href="mailto:damian.sligogreen@gmail.com"
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Mail className="w-5 h-5" /> Email
          </Link>
          <Link
            href="https://betterworktogether.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <BookOpen className="w-5 h-5" /> Better Work Together
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild className="bg-teal-700 hover:bg-teal-600 text-white rounded-full px-8 py-3 text-lg">
            <Link href="/cv.pdf" download>
              <Download className="inline-block mr-2 w-5 h-5" /> Download CV
            </Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-heading italic text-xl text-slate-300 mt-10"
        >
          Ngā mihi nui,
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-heading text-3xl md:text-4xl text-white mt-2"
        >
          Damian Sligo-Green
        </motion.p>
      </div>
    </footer>
  );
}
