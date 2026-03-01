'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Database, Briefcase, Heart } from 'lucide-react';

const whyLinzCards = [
  {
    icon: <Briefcase className="text-teal-700" size={28} />,
    title: 'Delivery in Complex Environments',
    description: 'Led multi-stakeholder delivery across government, not-for-profit and private sectors. From discovery through delivery, embedding with teams to achieve outcomes.',
  },
  {
    icon: <Database className="text-teal-700" size={28} />,
    title: 'Real LINZ Data Experience',
    description: 'Co-founder of ratemyflat, built directly on LINZ property data. Hands-on understanding of the data, the users, and the opportunities.',
  },
  {
    icon: <Heart className="text-teal-700" size={28} />,
    title: 'Working with Māori-led Organisations',
    description: 'Partnered with Para Kore (zero-waste, MfE) to develop a measurement and reporting platform and Amotai (Māori procurement org) while developing a procurement outcomes framework for NZ Govt Procurement. Adapted ways of working to ensure kaupapa Māori was incorporated and celebrated.',
  },
  {
    icon: <Lightbulb className="text-teal-700" size={28} />,
    title: 'AI as a Practical Tool',
    description: 'Built multi-model orchestration systems, RAG pipelines, and AI-enabled workflows. Experienced with agentic coding (see below) which leverages technical fluency and enables informed decisions about when AI is \u2014 and isn\u2019t \u2014 the right solution.',
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
