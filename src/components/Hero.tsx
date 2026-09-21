import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, Utensils, Award, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  setActiveView: (view: string) => void;
}

export default function Hero({ onOpenBooking, setActiveView }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-8 lg:px-12 xl:px-16">
      {/* Background Cinematic Image with Luxury Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2400&q=85"
          alt="Valeria's Catering Luxury Spread"
          className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/50 to-stone-950" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Philippines' Premier Haute Cuisine & Event Catering</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-6xl mx-auto"
        >
          Elevated Filipino Culinary Artistry for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Grand</span> Celebrations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-stone-300 text-base sm:text-xl max-w-4xl mx-auto font-sans font-light leading-relaxed"
        >
          From lavish Kasalang Marangya weddings in Tagaytay to premier corporate galas in BGC, valeriascatering.com crafts bespoke modern Filipino gastronomic experiences with live heritage carving stations and impeccable hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={() => setActiveView("calculator")}
            className="w-full sm:w-auto px-10 py-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-amber-500/30 cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>Estimate Quote (PHP)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-10 py-5 bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-200 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book Private Tasting</span>
          </button>
        </motion.div>

        {/* Quick Highlights Maximized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 border-t border-stone-800/80 w-full max-w-6xl mx-auto text-left"
        >
          <div className="bg-stone-900/70 border border-stone-800/80 p-5 rounded-2xl backdrop-blur-md">
            <div className="text-amber-400 font-serif text-3xl font-bold">15+</div>
            <div className="text-stone-400 text-xs font-mono uppercase mt-1">Years of Excellence</div>
          </div>
          <div className="bg-stone-900/70 border border-stone-800/80 p-5 rounded-2xl backdrop-blur-md">
            <div className="text-amber-400 font-serif text-3xl font-bold">1,200+</div>
            <div className="text-stone-400 text-xs font-mono uppercase mt-1">Luxury Events Catered</div>
          </div>
          <div className="bg-stone-900/70 border border-stone-800/80 p-5 rounded-2xl backdrop-blur-md">
            <div className="text-amber-400 font-serif text-3xl font-bold">4.9★</div>
            <div className="text-stone-400 text-xs font-mono uppercase mt-1">Client Satisfaction</div>
          </div>
          <div className="bg-stone-900/70 border border-stone-800/80 p-5 rounded-2xl backdrop-blur-md">
            <div className="text-amber-400 font-serif text-3xl font-bold">100%</div>
            <div className="text-stone-400 text-xs font-mono uppercase mt-1">Bespoke Customization</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
