import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Send, Bot, User, Check, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function AiMenuPlanner() {
  const [eventType, setEventType] = useState("Kasalang Marangya (Luxury Filipino Wedding)");
  const [guestCount, setGuestCount] = useState(150);
  const [dietary, setDietary] = useState("Halal & Pescatarian options for 20 guests, whole crisp lechon for grand buffet");
  const [theme, setTheme] = useState("Modern Filipiniana & Botanical Garden Elegance");
  const [vibe, setVibe] = useState("Warm Filipino hospitality, candlelit capiz tables, and live acoustic serenade");
  const [budget, setBudget] = useState("₱250,000 - ₱450,000");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProposal(null);

    try {
      const res = await fetch("/api/ai-menu-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, guestCount, dietary, theme, vibe, budget })
      });
      const data = await res.json();
      if (data.plan) {
        setProposal(data.plan);
      } else {
        setProposal("Valeria's Executive Chef recommends an on-site consultation to finalize your bespoke tasting menu.");
      }
    } catch (err) {
      console.error("AI menu planner error:", err);
      setProposal("Valeria's Executive Chef recommends an on-site consultation to finalize your bespoke tasting menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto border-t border-stone-800/80">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Gemini AI Concierge</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Bespoke AI Menu & Event Planner
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          Describe your vision, guest count, and dietary preferences to instantly generate a Michelin-inspired culinary proposal crafted by Valeria's AI Chef.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-2">Event Parameters</h3>

          <form onSubmit={handleGeneratePlan} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Event Type</label>
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Guest Count</label>
                <input
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Budget Range</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Theme & Styling Vibe</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Dietary Requirements</label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? "Crafting Menu Proposal..." : "Generate AI Menu & Concept"}</span>
            </button>
          </form>
        </div>

        {/* Output Proposal */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[500px] flex flex-col justify-center">
          {loading ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-full flex items-center justify-center mx-auto animate-spin">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Executive Chef AI is Designing Your Menu...</h3>
              <p className="text-xs text-stone-400 font-mono">Selecting seasonal pairings, wine notes, and tablescape layouts...</p>
            </div>
          ) : proposal ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-white">Valeria's AI Culinary Proposal</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Ready for Tasting
                </span>
              </div>

              <div className="text-stone-300 text-xs sm:text-sm leading-relaxed space-y-4 max-h-[500px] overflow-y-auto pr-2">
                <Markdown>{proposal}</Markdown>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-4 text-stone-500">
              <Sparkles className="w-12 h-12 mx-auto opacity-40 text-amber-400" />
              <p className="text-sm font-mono">Fill in your event parameters on the left and click Generate to see your custom AI menu proposal.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
