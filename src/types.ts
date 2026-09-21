export interface MenuItem {
  id: string;
  name: string;
  category: "Canapés" | "Plated Dinners" | "Grand Buffets" | "Artisanal Desserts" | "Cocktails & Bar";
  pricePerPerson: number;
  description: string;
  dietaryTags: string[];
  imageUrl: string;
}

export interface EventPackage {
  id: string;
  name: string;
  pricePerPerson: number;
  minGuests: number;
  description: string;
  highlights: string[];
  popular?: boolean;
}

export interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  packageSelected: string;
  budget: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  quote: string;
  eventType: string;
  rating: number;
  imageUrl: string;
}
