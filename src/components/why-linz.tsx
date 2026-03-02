'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Database, Briefcase, Heart } from 'lucide-react';
import Link from 'next/link';

const whyLinzCards: { icon: React.ReactNode; title: string; description: React.ReactNode }[] = [
  {
    icon: <Database className="text-teal-700" size={28} />,
    title: 'LINZ Data User',
    description: 'Developed specifications using LINZ DVR data for ratemyflat — a tenant-focused property insights platform.',
  },
  {
    icon: <Lightbulb className="text-teal-700" size={28} />,
    title: 'AI Product Leader',
    description: 'Comfortable in the terminal \u2014 I\u2019ve architected multi-model, multi-agent orchestration systems from scratch. I bridge technical execution with strategic product delivery, collaborating with developers, designers, and clients to enhance collective performance and capability.',
  },
  {
    icon: <Briefcase className="text-teal-700" size={28} />,
    title: 'Government Experience',
    description: 'Designed outcomes frameworks, emissions scenario calculators, and flight planning tools. I\u2019ve led projects, managing engagement from strategic governance to operational delivery, and coordinated teams both within and outside government to achieve tangible outcomes.',
  },
  {
    icon: <Heart className="text-teal-700" size={28} />,
    title: 'He Whenua, He T\u0101ngata',
    description: (<>I have significant experience working with diverse stakeholders and user groups, including Māori rōpū (e.g., <Link href="https://parakore.maori.nz/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-800 font-medium">Para Kore</Link>, <Link href="https://amotai.nz/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-800 font-medium">Amotai</Link>). I am deeply committed to our shared home and improving outcomes for all New Zealanders.</>),
  },
];

export function WhyLinz() {
  return (
    <section id="why-linz" className="bg-teal-50 py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-4xl md:text-5xl font-heading text-center text-slate-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Me + This Role = ✨
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyLinzCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
            >
              <Card className="h-full bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <CardHeader>
                  <div className="mb-4 text-teal-700 group-hover:scale-110 transition-transform origin-top-left">
                    {card.icon}
                  </div>
                  <CardTitle className="font-heading text-2xl text-slate-800">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-700 text-base">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
