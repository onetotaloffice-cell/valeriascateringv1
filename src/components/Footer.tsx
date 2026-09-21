import React from "react";
import { UtensilsCrossed, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  setActiveView: (view: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveView, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-16 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white">Valeria's Catering</span>
              <span className="block text-[10px] font-mono tracking-widest text-amber-400">valeriascatering.com</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Bespoke modern Filipino food catering and event planning for luxury weddings, debuts, and grand corporate galas across the Philippines.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => setActiveView("home")} className="hover:text-amber-400 transition-colors cursor-pointer">Home</button></li>
            <li><button onClick={() => setActiveView("menus")} className="hover:text-amber-400 transition-colors cursor-pointer">Gastronomic Menus</button></li>
            <li><button onClick={() => setActiveView("packages")} className="hover:text-amber-400 transition-colors cursor-pointer">Event Packages</button></li>
            <li><button onClick={() => setActiveView("calculator")} className="hover:text-amber-400 transition-colors cursor-pointer">Quote Calculator (PHP)</button></li>
            <li><button onClick={() => setActiveView("ai-planner")} className="hover:text-amber-400 transition-colors cursor-pointer">AI Menu Concierge</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Contact & Tastings</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>28th St. cor. 5th Ave, BGC, Taguig, Metro Manila, Philippines</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+63 (02) 8555-8253 / +63 917 555 8253</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>concierge@valeriascatering.com</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Private Tastings</h4>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Schedule a complimentary private tasting session with our Executive Chef at our flagship culinary salon.
          </p>
          <button
            onClick={onOpenBooking}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            Book Tasting Session
          </button>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono">
        <div>© 2026 valeriascatering.com • Valeria's Catering & Events. All rights reserved.</div>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Health & Safety Standards</a>
        </div>
      </div>
    </footer>
  );
}
