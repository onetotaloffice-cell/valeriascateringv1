import React from "react";
import { motion } from "motion/react";
import { testimonialsList } from "../data/cateringData";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto border-t border-stone-800/80">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Star className="w-3.5 h-3.5" />
          <span>Client Praise</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Words from Our Esteemed Hosts
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          Read reflections from brides, grooms, and corporate leaders who entrusted Valeria's Catering with their milestone celebrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsList.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-colors"
          >
            <Quote className="absolute top-6 right-6 w-16 h-16 text-amber-500/10 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, rIdx) => (
                  <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="font-serif italic text-stone-200 text-base sm:text-lg leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-stone-800">
              <img
                src={t.imageUrl}
                alt={t.clientName}
                className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-serif font-bold text-white">{t.clientName}</div>
                <div className="text-xs text-amber-400 font-mono">{t.role}</div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">{t.eventType}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
