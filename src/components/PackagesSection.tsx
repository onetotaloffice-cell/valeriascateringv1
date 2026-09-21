import React from "react";
import { motion } from "motion/react";
import { eventPackagesList } from "../data/cateringData";
import { Check, Star, Calendar } from "lucide-react";

interface PackagesProps {
  onOpenBooking: () => void;
}

export default function PackagesSection({ onOpenBooking }: PackagesProps) {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto border-t border-stone-800/80">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Star className="w-3.5 h-3.5" />
          <span>Curated Event Packages</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          All-Inclusive Luxury Event Experiences
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          Choose from our thoughtfully designed catering packages or let our planners curate a custom service tailored to your exact vision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
        {eventPackagesList.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all ${
              pkg.popular 
                ? "bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/20 border-amber-500/50 shadow-2xl shadow-amber-500/10" 
                : "bg-stone-900/80 border-stone-800"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                Most Popular Choice
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">{pkg.name}</h3>
              <p className="text-stone-400 text-xs font-light leading-relaxed">{pkg.description}</p>
              
              <div className="py-4 border-y border-stone-800 flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-4xl font-bold text-amber-400">₱{pkg.pricePerPerson.toLocaleString()}</span>
                  <span className="text-xs font-mono text-stone-400 ml-1">/ guest</span>
                </div>
                <span className="text-xs font-mono text-stone-400">Min. {pkg.minGuests} guests</span>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">Package Highlights:</span>
                {pkg.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-800">
              <button
                onClick={onOpenBooking}
                className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  pkg.popular 
                    ? "bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg" 
                    : "bg-stone-800 hover:bg-stone-700 text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire About Package</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
