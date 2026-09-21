import React, { useState } from "react";
import { motion } from "motion/react";
import { menuItemsList } from "../data/cateringData";
import { Utensils, Sparkles, Filter } from "lucide-react";

export default function MenuCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Canapés", "Plated Dinners", "Grand Buffets", "Artisanal Desserts", "Cocktails & Bar"];

  const filteredItems = selectedCategory === "All" 
    ? menuItemsList 
    : menuItemsList.filter(item => item.category === selectedCategory);

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Utensils className="w-3.5 h-3.5" />
          <span>Gastronomic Portfolio</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Modern Filipino Gastronomy & Artisanal Menus
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          Experience our elevated Philippine tasting portfolios featuring sustainably sourced local produce, Davao single-origin cacao, and heirloom regional recipes.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20" 
                  : "bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Maximized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-amber-500/50 transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 px-3 py-1 bg-stone-950/80 backdrop-blur-md border border-stone-800 text-amber-400 font-serif font-bold text-sm rounded-xl shadow-lg">
                ₱{item.pricePerPerson.toLocaleString()} <span className="text-[10px] font-mono font-normal text-stone-400">/ guest</span>
              </span>
              <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                {item.dietaryTags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[9px] uppercase font-bold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">{item.category}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">{item.name}</h3>
                <p className="text-stone-400 text-xs mt-2 leading-relaxed font-light">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
