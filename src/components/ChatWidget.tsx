import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Mabuhay and welcome to Valeria's Catering! How may our BGC culinary concierge assist with your wedding, debut, or event catering in the Philippines today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const txt = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: txt }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Salamat for your inquiry! Our executive event director in BGC will review your details and send you an itemized proposal in Philippine Pesos (₱). You may also book a complimentary private tasting session anytime!" }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[450px]">
          <div className="bg-stone-950 px-4 py-3 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-serif font-bold text-xs uppercase text-white tracking-wider">Valeria's Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${m.sender === "user" ? "bg-amber-500 text-stone-950 font-bold" : "bg-stone-800 text-stone-200"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-stone-950 border-t border-stone-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about menus, availability, tastings..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
            />
            <button type="submit" className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
