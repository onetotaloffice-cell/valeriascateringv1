import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

dotenv.config();

// Initialize Firebase Admin with project configuration
let db: any = null;
try {
  let projectId = "valerias-catering";
  let databaseId: string | undefined = undefined;
  
  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (config?.projectId) {
        projectId = config.projectId;
      }
      if (config?.firestoreDatabaseId && config.firestoreDatabaseId !== "(default)") {
        databaseId = config.firestoreDatabaseId;
      }
    }
  } catch (confErr) {
    // default to valerias-catering
  }

  if (!getApps().length) {
    initializeApp({ projectId });
  }
  
  const appInstance = getApps()[0];
  db = databaseId ? getFirestore(appInstance, databaseId) : getFirestore(appInstance);
} catch (e) {
  console.warn("Firestore admin initialization notice:", e);
}

// In-memory fallback inquiries storage (Filipino clients with PHP currency)
const memoryInquiries: any[] = [
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
    notes: "Tagaytay Glass Garden reception. Requires live Cebu lechon carving and Don Papa craft cocktail bar.",
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
];

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features will return demo responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "valeriascatering.com", timestamp: new Date().toISOString() });
});

// Get Inquiries
app.get("/api/inquiries", async (req, res) => {
  try {
    if (!db) {
      return res.json({ success: true, count: memoryInquiries.length, inquiries: memoryInquiries });
    }
    const snapshot = await db.collection("inquiries").orderBy("createdAt", "desc").get();
    const list = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, count: list.length, inquiries: list.length > 0 ? list : memoryInquiries });
  } catch (error: any) {
    res.json({ success: true, count: memoryInquiries.length, inquiries: memoryInquiries });
  }
});

// Create Inquiry
app.post("/api/inquiries", async (req, res) => {
  try {
    const newInquiry = {
      id: `inq_${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      status: req.body.status || "New Inquiry"
    };

    memoryInquiries.unshift(newInquiry);

    if (db) {
      try {
        const docRef = await db.collection("inquiries").add({
          ...req.body,
          createdAt: FieldValue.serverTimestamp(),
          status: req.body.status || "New Inquiry"
        });
        newInquiry.id = docRef.id;
      } catch (fbErr) {
        console.warn("Firestore inquiry write skipped, stored in memory:", fbErr);
      }
    }

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    console.error("Error saving inquiry:", error);
    res.status(500).json({ error: "Failed to submit event inquiry." });
  }
});

// AI Menu & Event Planner Endpoint
app.post("/api/ai-menu-planner", async (req, res) => {
  const { eventType, guestCount, dietary, theme, vibe, budget } = req.body;

  const fallbackProposal = `### VALERIA'S BESPOKE FILIPINO CULINARY PROPOSAL (${eventType || "Kasalang Marangya & Grand Celebration"})
*(Executive Chef Curated Proposal - Philippine Haute Cuisine)*

**Estimated Investment**: ${budget || "₱285,000 - ₱450,000"} for ${guestCount || 150} guests

1. **Amuse-Bouche & Welcome Cocktail Canapés**:
   - *Crispy Pork Belly Lechon Croquettes*: Stuffed with 18-hour slow-roasted pork belly, served with spiced liver emulsion and calamansi pearls.
   - *GenSan Tuna Kilawin on Squid Ink Cracker*: Yellowfin tuna ceviche cured in Ilocos vinegar and pressed coconut milk foam.
   - *Mini Wagyu Bistek Tartlets*: Tender Miyazaki beef medallions with caramelized shallots and calamansi reduction.

2. **First Course / Sopas & Pica-Pica**:
   - *Bouillabaisse Filipina*: Palawan tiger prawns, mud crab, and slipper lobster in an aromatic native pink guava & lemongrass reduction.

3. **Main Plated & Carving Selections**:
   - *USDA Prime Angus Beef Short Rib Kare-Kare*: Slow-braised short rib with rich roasted peanut-cashew purée, micro eggplant, and annatto garlic heirloom rice.
   - *Pan-Roasted Chilean Sea Bass Sinigang de Guayaba*: Crispy-skin sea bass with confit shallots and kangkong butter.
   - *Heritage Live Cebu Lechon Carving Station*: Crispy crackling roast suckling pig with spiced Sinamak liver gravy.

4. **Artisanal Philippine Dessert**:
   - *Deconstructed Halo-Halo Elegance*: Handcrafted Ube Halaya gelato, leche flan cream sphere, caramelized macapuno, toasted pinipig, and 24K edible gold leaf.
   - *Warm Davao Tablea Dark Chocolate Lava Cake*: Paired with carabao's milk gelato.

5. **Signature Beverage & Bar**:
   - *Don Papa & Lambanog Botanical Bar*: Bespoke cocktails infused with Mindoro calamansi, roasted kaffir lime, and pandan honey syrup.

6. **Event Styling & Filipiniana Scenography**:
   - ${vibe || "Modern Filipiniana luxury"} featuring handwoven capiz shell accents, warm amber candlelight, native floral installations, and white-glove butler service (1:5 guest ratio).

*Schedule your private tasting session at our BGC culinary studio via valeriascatering.com.*`;

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.json({ success: true, plan: fallbackProposal });
    }

    const ai = getGeminiClient();
    const prompt = `You are Executive Chef and Event Director at Valeria's Catering & Events (valeriascatering.com) based in Bonifacio Global City, Metro Manila, Philippines.
Create an exquisite, custom culinary and event menu proposal in Philippine Pesos (₱) based on the following client details:
- Event Type: ${eventType || "Kasalang Marangya (Filipino Luxury Wedding)"}
- Guest Count: ${guestCount || 150} guests
- Dietary Requirements: ${dietary || "Authentic Filipino haute cuisine with halal/pescatarian options"}
- Theme / Style: ${theme || "Modern Filipiniana & Botanical Garden Elegance"}
- Desired Vibe: ${vibe || "Warm Filipino hospitality, candlelit capiz tables, and live acoustic serenade"}
- Budget Range: ${budget || "₱250,000 - ₱450,000"}

Provide a structured, beautifully formatted Markdown proposal featuring authentic, elevated modern Filipino dishes:
1. **Welcome Canapés & Cocktail Hour** (3 elevated Filipino bites e.g., Tuna Kilawin, Lechon Croquettes, Wagyu Bistek tarts)
2. **Plated or Buffet Course Structure** (Starter, Elevated Main courses like Angus Short Rib Kare-Kare, Chilean Sea Bass Sinigang, or Live Cebu Lechon carving station)
3. **Signature Dessert & Beverage Pairing** (Artisanal Filipino desserts like Deconstructed Halo-Halo, Tablea chocolate lava cake, Don Papa rum / Lambanog craft cocktails)
4. **Service & Styling Recommendations** (Capiz accents, table styling, staff ratio, and atmospheric presentation)
5. **Itemized Investment in Philippine Pesos (₱)**

Write with the luxurious, refined tone of a world-class private caterer celebrating Philippine culinary heritage.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Executive Chef and Event Concierge for Valeria's Catering & Events in Metro Manila, Philippines. You specialize in modern elevated Philippine haute cuisine and quote prices exclusively in Philippine Pesos (₱ / PHP).",
      }
    });

    res.json({ success: true, plan: response.text });
  } catch (error: any) {
    console.error("Gemini AI menu planner error:", error);
    res.json({
      success: true,
      plan: fallbackProposal
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite developer server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Valeria's Catering server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
