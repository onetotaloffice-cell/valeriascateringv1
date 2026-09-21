import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Users, Calendar, CheckCircle2 } from "lucide-react";
import { eventPackagesList } from "../data/cateringData";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface QuoteCalculatorProps {
  onOpenBookingWithDetails?: (details: any) => void;
}

export default function QuoteCalculator({ onOpenBookingWithDetails }: QuoteCalculatorProps) {
  const [eventType, setEventType] = useState("Kasalang Marangya (Wedding Reception)");
  const [guestCount, setGuestCount] = useState(120);
  const [packageId, setPackageId] = useState(eventPackagesList[1].id);
  const [includeBar, setIncludeBar] = useState(true);
  const [includeStyling, setIncludeStyling] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");

  const selectedPkg = eventPackagesList.find(p => p.id === packageId) || eventPackagesList[1];

  // Calculation in Philippine Pesos (PHP)
  const basePerPerson = selectedPkg.pricePerPerson;
  const barAddon = includeBar ? 450 : 0;
  const stylingAddon = includeStyling ? 350 : 0;
  const totalPerPerson = basePerPerson + barAddon + stylingAddon;
  const estimatedTotal = totalPerPerson * guestCount;

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
      eventType,
      guestCount,
      eventDate,
      packageSelected: `${selectedPkg.name} (₱${totalPerPerson.toLocaleString()}/guest)`,
      budget: `₱${estimatedTotal.toLocaleString()}`,
      notes: `Philippine Catering Calculator. Don Papa Bar: ${includeBar}, Floral/Capiz Styling: ${includeStyling}`,
      status: "New Calculator Inquiry",
      createdAt: new Date().toISOString()
    };

    try {
      try {
        await addDoc(collection(db, "inquiries"), {
          ...payload,
          serverTimestamp: serverTimestamp()
        });
      } catch (fbErr) {
        console.warn("Direct client Firestore quote save fallback:", fbErr);
      }

      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quote inquiry:", err);
      setSubmitted(true);
    }
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full max-w-[1720px] mx-auto border-t border-stone-800/80">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Estimation Engine</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Instant Philippine Event Quote Calculator
        </h2>
        <p className="text-stone-400 text-sm sm:text-base max-w-3xl mx-auto font-light">
          Configure your event parameters in Philippine Pesos (₱) to instantly calculate transparent catering costs for your wedding, debut, or corporate gala.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        {/* Controls Form */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <h3 className="text-xl font-serif font-bold text-white mb-2">1. Select Event Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
              >
                <option>Kasalang Marangya (Wedding Reception)</option>
                <option>Grand Debutante 18th Birthday</option>
                <option>Corporate Milestone Gala (BGC / Makati)</option>
                <option>Intimate Salu-Salo & Baptismal Fiesta</option>
                <option>Tagaytay Garden Celebration</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2">Service Package</label>
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
              >
                {eventPackagesList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (₱{p.pricePerPerson.toLocaleString()}/guest)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">Guest Count</label>
              <span className="font-serif font-bold text-amber-400 text-base">{guestCount} Guests</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">Bespoke Add-ons (Philippine Peso)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${includeBar ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-stone-950 border-stone-800 text-stone-400"}`}>
                <input
                  type="checkbox"
                  checked={includeBar}
                  onChange={(e) => setIncludeBar(e.target.checked)}
                  className="accent-amber-500 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold">Don Papa & Lambanog Craft Bar</div>
                  <div className="text-[10px] font-mono text-amber-400">+₱450 / guest</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${includeStyling ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-stone-950 border-stone-800 text-stone-400"}`}>
                <input
                  type="checkbox"
                  checked={includeStyling}
                  onChange={(e) => setIncludeStyling(e.target.checked)}
                  className="accent-amber-500 w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold">Capiz & Native Floral Tablescape</div>
                  <div className="text-[10px] font-mono text-amber-400">+₱350 / guest</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Live Estimate Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/30 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Proposal Request Received!</h3>
              <p className="text-xs text-stone-400 leading-relaxed max-w-xs mx-auto">
                Our executive event director in BGC will review your details and send you an itemized Philippine Peso contract proposal within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Calculate Another Quote
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Total Investment (PHP)</span>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-white mt-1">
                  ₱{estimatedTotal.toLocaleString()}
                </div>
                <div className="text-xs text-stone-400 mt-1 font-mono">
                  Est. ₱{totalPerPerson.toLocaleString()} per guest ({guestCount} guests)
                </div>
              </div>

              <form onSubmit={handleEstimateSubmit} className="space-y-3 pt-4 border-t border-stone-800">
                <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">Lock In This Estimate</h4>
                
                <input
                  type="text"
                  required
                  placeholder="Full Name (e.g. Maria Kristina Cojuangco)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="PH Phone (+63 917 123 4567)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-300 outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer"
                >
                  Request Official Proposal (PHP)
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
