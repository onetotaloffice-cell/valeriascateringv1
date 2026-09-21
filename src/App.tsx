import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuCatalog from "./components/MenuCatalog";
import PackagesSection from "./components/PackagesSection";
import QuoteCalculator from "./components/QuoteCalculator";
import AiMenuPlanner from "./components/AiMenuPlanner";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import AdminConsole from "./components/AdminConsole";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const [activeView, setActiveView] = useState<string>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      <Header
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="flex-grow">
        {activeView === "home" && (
          <>
            <Hero onOpenBooking={() => setIsBookingOpen(true)} setActiveView={setActiveView} />
            <MenuCatalog />
            <PackagesSection onOpenBooking={() => setIsBookingOpen(true)} />
            <QuoteCalculator />
            <AiMenuPlanner />
            <GallerySection />
            <TestimonialsSection />
          </>
        )}

        {activeView === "menus" && (
          <div className="pt-8">
            <MenuCatalog />
          </div>
        )}

        {activeView === "packages" && (
          <div className="pt-8">
            <PackagesSection onOpenBooking={() => setIsBookingOpen(true)} />
          </div>
        )}

        {activeView === "calculator" && (
          <div className="pt-8">
            <QuoteCalculator />
          </div>
        )}

        {activeView === "ai-planner" && (
          <div className="pt-8">
            <AiMenuPlanner />
          </div>
        )}

        {activeView === "gallery" && (
          <div className="pt-8">
            <GallerySection />
          </div>
        )}
      </main>

      <Footer
        setActiveView={setActiveView}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <AdminConsole
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <ChatWidget />
    </div>
  );
}
