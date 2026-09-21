import { MenuItem, EventPackage, TestimonialItem } from "../types";

export const menuItemsList: MenuItem[] = [
  {
    id: "m-1",
    name: "Crispy Lechon Belly Croquettes with Spiced Liver Emulsion",
    category: "Canapés",
    pricePerPerson: 380,
    description: "Crisp golden croquettes stuffed with 18-hour slow-roasted pork belly, served with a velvety native spiced liver emulsion, calamansi pearls, and micro cilantro.",
    dietaryTags: ["Chef's Signature", "Artisanal"],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-2",
    name: "Tuna Kilawin on Squid Ink Cracker with Coconut Foam",
    category: "Canapés",
    pricePerPerson: 420,
    description: "Sashimi-grade General Santos yellowfin tuna ceviche cured in Ilocos cane vinegar, pure calamansi, pressed coconut milk foam, and edible flower blossoms.",
    dietaryTags: ["Gluten-Free", "Pescatarian"],
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-3",
    name: "USDA Angus Beef Short Rib Kare-Kare with Truffle Peanut Puree",
    category: "Plated Dinners",
    pricePerPerson: 1250,
    description: "Braised Prime Angus short rib with artisanal ground roasted cashew-peanut reduction, shaved black summer truffle, charred Tagaytay baby eggplant, and annatto garlic rice crisp.",
    dietaryTags: ["Chef's Signature", "Bestseller"],
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-4",
    name: "Pan-Roasted Chilean Sea Bass Sinigang de Guayaba",
    category: "Plated Dinners",
    pricePerPerson: 1450,
    description: "Sustainably sourced Chilean sea bass with crisp skin, resting in an aromatic native pink guava and tamarind reduction, with buttered water spinach and confit shallots.",
    dietaryTags: ["Pescatarian", "Gluten-Free"],
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-5",
    name: "Chicken Inasal Galantine with Lemongrass Annatto Glaze",
    category: "Plated Dinners",
    pricePerPerson: 980,
    description: "Free-range Negros chicken ballotine infused with sinamak vinegar, fresh lemongrass, and garlic confit, brushed with warm achiote butter and served with whipped native sweet potato.",
    dietaryTags: ["Halal Options", "Heritage Recipe"],
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-6",
    name: "Grand Cebu Lechon Carving & Seafood Paella Filipina Station",
    category: "Grand Buffets",
    pricePerPerson: 1850,
    description: "Live carving of traditional Cebu herb-stuffed roast suckling pig with crackling skin, paired with Palawan tiger prawns, mud crab, and slipper lobster Paella Filipina over saffron garlic heirloom rice.",
    dietaryTags: ["Grand Feast", "Live Station"],
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-7",
    name: "Deconstructed Halo-Halo with Ube Halaya Gelato & 24K Gold Leaf",
    category: "Artisanal Desserts",
    pricePerPerson: 350,
    description: "Artisanal purple yam gelato, caramelized macapuno strings, leche flan cream sphere, pandan coconut jelly, toasted pinipig, and genuine 24K edible gold flake.",
    dietaryTags: ["Vegetarian", "Chef's Signature"],
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m-8",
    name: "Archipelago Calamansi & Don Papa Botanical Bar",
    category: "Cocktails & Bar",
    pricePerPerson: 450,
    description: "Bespoke Philippine craft cocktails featuring aged Don Papa Rum, Quezon Lambanog, fresh cold-pressed Mindoro calamansi, roasted kaffir lime, and pandan-infused honey syrup.",
    dietaryTags: ["Craft Cocktail", "Open Bar"],
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  }
];

export const eventPackagesList: EventPackage[] = [
  {
    id: "pkg-1",
    name: "Intimate Salu-Salo & Private Dining",
    pricePerPerson: 1650,
    minGuests: 20,
    description: "Curated for boutique family celebrations, baptismals, and executive dinners requiring intimate luxury, personalized course pairings, and attentive service.",
    highlights: [
      "4-Course Modern Filipino Tasting Menu",
      "Executive Chef & Butler Service (1:5 Ratio)",
      "Capiz Shell & Candlelit Tablescape Styling",
      "Welcome Fresh Calamansi-Pandan Spritzer"
    ]
  },
  {
    id: "pkg-2",
    name: "Kasalang Marangya & Grand Wedding Feast",
    pricePerPerson: 2450,
    minGuests: 80,
    description: "Our premier Filipino wedding celebration package featuring lavish multi-course gourmet plating, live Cebu lechon carving, and signature cocktail reception.",
    highlights: [
      "5-Course Gastronomic Plated Experience",
      "Live Cebu Roast Lechon Carving Station",
      "Deconstructed Halo-Halo Dessert Bar",
      "Complimentary Menu Tasting for 6 Guests",
      "Full Crystal Glassware & Gold Flatware Setup"
    ],
    popular: true
  },
  {
    id: "pkg-3",
    name: "Executive Fiesta & Corporate Gala",
    pricePerPerson: 1950,
    minGuests: 100,
    description: "Designed for corporate anniversaries, diplomatic receptions, and luxury product launches showcasing the pinnacle of Philippine gastronomy.",
    highlights: [
      "6 Luxury Canapé Passing Trays",
      "Seafood Paella Filipina Live Wok Station",
      "Craft Cocktail Bar with Don Papa & Lambanog",
      "Dedicated Event Director & Full On-site Coordination"
    ]
  }
];

export const testimonialsList: TestimonialItem[] = [
  {
    id: "t-1",
    clientName: "Maria Kristina Cojuangco-Reyes",
    role: "Bride & Creative Director",
    quote: "Valeria's Catering transformed our Tagaytay wedding into an absolute culinary triumph. The Angus Beef Kare-Kare and Deconstructed Halo-Halo had our guests raving for weeks. Truly world-class modern Filipino hospitality.",
    eventType: "Tagaytay Glasshouse Wedding (220 Guests)",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "t-2",
    clientName: "Atty. Rafael Tan",
    role: "Senior Partner, Tan & Associates BGC",
    quote: "For our firm's 25th anniversary gala, Valeria's delivered an immaculate 5-course Filipino culinary journey. The Cebu lechon carving and Don Papa craft cocktails set a new benchmark for luxury catering in the Philippines.",
    eventType: "Corporate Milestone Gala, Makati (350 Guests)",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "t-3",
    clientName: "Bianca Gonzalez-Soriano",
    role: "Debutante Host & Event Producer",
    quote: "Every single detail of my daughter's 18th debut was executed with precision. From the Capiz-accented gold tablescapes to the Lechon Croquettes and live dessert bar, the entire experience was sheer perfection.",
    eventType: "Grand Debutante Gala, Forbes Park (180 Guests)",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  }
];

export const galleryPhotos = [
  { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80", title: "Modern Filipino Wedding Table Styling" },
  { url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80", title: "Grand Seafood Paella & Lechon Feast" },
  { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80", title: "Sommelier Pairing & Lambanog Bar" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80", title: "Artisanal Inasal Galantine Presentation" },
  { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80", title: "Tagaytay Sunset Garden Reception" },
  { url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80", title: "Candlelit Kasalan Ballroom Evening" }
];
