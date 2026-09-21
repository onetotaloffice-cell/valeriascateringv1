import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { galleryPhotos } from "../data/cateringData";
import { Sparkles, X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto border-t border-stone-800/80">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visual Showcase</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Moments of Culinary Elegance
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          A glimpse into our meticulously styled tablescapes, plated culinary masterpieces, and breathtaking celebrations across Tagaytay and Metro Manila.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {galleryPhotos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => setActiveImage(photo.url)}
            className="relative group rounded-3xl overflow-hidden aspect-[4/3] border border-stone-800 cursor-pointer shadow-2xl bg-stone-900"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="flex items-center justify-between w-full">
                <span className="font-serif text-white font-bold text-base">{photo.title}</span>
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-stone-800 bg-stone-900"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-2xl bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activeImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
