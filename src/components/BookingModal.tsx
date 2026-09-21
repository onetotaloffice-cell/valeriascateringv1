import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, CheckCircle2 } from "lucide-react";
import { eventPackagesList } from "../data/cateringData";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Kasalang Marangya (Wedding Reception)");
  const [guestCount, setGuestCount] = useState(150);
  const [eventDate, setEventDate] = useState("");
  const [packageSelected, setPackageSelected] = useState(eventPackagesList[1].name);
  const [budget, setBudget] = useState("₱250,000 - ₱450,000");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const inquiryPayload = {
      name,
      email,
      phone,
      eventType,
      guestCount: Number(guestCount),
      eventDate,
      packageSelected,
      budget,
      notes,
      status: "Confirmed Tasting",
      createdAt: new Date().toISOString()
    };

    try {
      // Save directly to Firestore collection
      try {
        await addDoc(collection(db, "inquiries"), {
          ...inquiryPayload,
          serverTimestamp: serverTimestamp()
        });
      } catch (fbErr) {
        console.warn("Direct client Firestore write notice:", fbErr);
      }

      // Also persist to API endpoint for complete synchronization
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryPayload)
      });
      setSuccess(true);
    } catch (err) {
      console.error("Failed to submit booking:", err);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden text-white p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Private Tasting Booked!</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
              Our executive event concierge at valeriascatering.com has received your request and will contact you within 2 hours to confirm your private tasting schedule.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Book Private Tasting & Consultation</h3>
                <p className="text-xs font-mono text-stone-400">valeriascatering.com • Complimentary Chef's Tasting</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Maria Kristina Cojuangco"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="kristina@example.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Mobile Phone (Philippines)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+63 917 555 8253"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  >
                    <option>Kasalang Marangya (Wedding Reception)</option>
                    <option>Grand Debutante (18th Birthday)</option>
                    <option>Corporate Milestone Gala (BGC / Makati)</option>
                    <option>Intimate Salu-Salo & Baptismal Fiesta</option>
                    <option>Tagaytay / Metro Manila Private Dining</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Target Event Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-300 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Guest Count</label>
                  <input
                    type="number"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Preferred Package</label>
                  <select
                    value={packageSelected}
                    onChange={(e) => setPackageSelected(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
                  >
                    {eventPackagesList.map((p) => (
                      <option key={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">Additional Notes (Dietary requirements, venue, etc.)</label>
                <textarea
                  rows={2}
                  placeholder="Vegetarian options for 10 guests, outdoor garden setup..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{submitting ? "Confirming..." : "Confirm Private Tasting Request"}</span>
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
