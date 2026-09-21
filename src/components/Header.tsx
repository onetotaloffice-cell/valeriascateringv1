import React, { useState } from "react";
import { UtensilsCrossed, Calendar, Sparkles, Menu, X, Shield, PhoneCall } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Header({ onOpenBooking, onOpenAdmin, activeView, setActiveView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "menus", label: "Menus" },
    { id: "packages", label: "Packages" },
    { id: "calculator", label: "Quote Calculator" },
    { id: "ai-planner", label: "AI Menu Concierge" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 border-b border-stone-800 backdrop-blur-md">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveView("home")} 
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Valeria's Catering
            </span>
            <span className="block text-[10px] font-mono tracking-widest uppercase text-amber-400/90">
              valeriascatering.com
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveView(link.id)}
              className={`text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                activeView === link.id ? "text-amber-400 font-bold" : "text-stone-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer border border-stone-800"
            title="Admin & Inquiries Dashboard"
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenBooking}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Tasting</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-stone-900 text-stone-300 hover:text-white border border-stone-800 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-mono uppercase tracking-widest py-2 transition-colors ${
                  activeView === link.id ? "text-amber-400 font-bold" : "text-stone-300"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-stone-800 text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Inquiries Console</span>
            </button>
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-amber-500 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Tasting Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
