import React, { useState, useEffect } from "react";
import { X, Shield, Phone, Mail, Calendar, Users, DollarSign, RefreshCw } from "lucide-react";
import { InquirySubmission } from "../types";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminConsole({ isOpen, onClose }: AdminConsoleProps) {
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([
    {
      id: "inq_1",
      name: "Maria Kristina Cojuangco-Reyes",
      email: "kristina@cojuangco.ph",
      phone: "+63 917 555 8253",
      eventType: "Kasalang Marangya (Wedding Reception)",
      guestCount: 220,
      eventDate: "2026-11-28",
      packageSelected: "Kasalang Marangya (₱2,450/guest)",
      budget: "₱539,000",
      notes: "Tagaytay Glass Garden reception. Require live Cebu lechon carving and Don Papa cocktail bar.",
      status: "Confirmed Tasting",
      createdAt: new Date().toISOString()
    },
    {
      id: "inq_2",
      name: "Atty. Rafael Tan",
      email: "r.tan@tanlawbgc.com",
      phone: "+63 (02) 8888-1234",
      eventType: "Corporate Milestone Gala",
      guestCount: 300,
      eventDate: "2026-12-10",
      packageSelected: "Executive Fiesta & Corporate Gala (₱1,950/guest)",
      budget: "₱585,000",
      notes: "25th Anniversary at Shangri-La at The Fort BGC ballroom. 5-course elevated Filipino dining.",
      status: "New Inquiry",
      createdAt: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let unsub: (() => void) | null = null;
    try {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const docs: InquirySubmission[] = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<InquirySubmission, "id">)
            }));
            setInquiries(docs);
          }
        },
        async (error) => {
          console.warn("Firestore snapshot listener error, falling back to API:", error);
          // Fallback to API
          try {
            const res = await fetch("/api/inquiries");
            const data = await res.json();
            if (data.inquiries && data.inquiries.length > 0) {
              setInquiries(data.inquiries);
            }
          } catch (apiErr) {
            console.warn("API fallback error:", apiErr);
          }
        }
      );
    } catch (e) {
      console.warn("Firestore listener initialization:", e);
      fetch("/api/inquiries")
        .then((res) => res.json())
        .then((data) => {
          if (data.inquiries && data.inquiries.length > 0) {
            setInquiries(data.inquiries);
          }
        })
        .catch((err) => console.warn(err));
    }

    return () => {
      if (unsub) unsub();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-stone-950/85 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden text-white p-6 sm:p-10 relative max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">valeriascatering.com • Executive Admin Console</h3>
              <p className="text-xs font-mono text-stone-400">Manage client inquiries, tasting appointments, and event proposals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto py-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">Incoming Inquiries & Tastings ({inquiries.length})</h4>
            <span className="text-xs font-mono text-stone-400">Real-time sync</span>
          </div>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-stone-950 border border-stone-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-lg text-white">{inq.name}</span>
                    <span className="px-3 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px] uppercase font-bold rounded-full">
                      {inq.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /> {inq.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-400" /> {inq.email}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {inq.eventDate || "Date TBD"}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-400" /> {inq.guestCount} Guests</span>
                  </div>

                  <div className="text-xs text-stone-300 font-light">
                    <strong className="text-amber-400 font-mono">Package:</strong> {inq.packageSelected} ({inq.eventType})
                  </div>
                  {inq.notes && (
                    <p className="text-xs text-stone-400 italic">"{inq.notes}"</p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-stone-800">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">Est. Budget</div>
                    <div className="text-base font-serif font-bold text-amber-400">{inq.budget}</div>
                  </div>
                  <button
                    onClick={() => alert(`Opening official proposal dispatch for ${inq.name}`)}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Dispatch Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
