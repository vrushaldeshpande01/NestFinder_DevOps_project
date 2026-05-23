import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily or safely
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("GoogleGenAI client initialized successfully with server-side key.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. Bot will run in local fallback mode.");
}

// System instructions containing precise knowledge of our properties
const supportSystemInstruction = `
You are the official NestFinder PG Assistant. You are friendly, helpful, objective, and polite.
Your goal is to help students and young professionals find safe, comfortable, and affordable PG (paying guest) accommodations in Bangalore, Gurgaon, and Pune.

We have the following premium PG listings under management:
1. **The Urban Retreat** in Koramangala, Bangalore:
   - Rent: ₹12,500/mo.
   - Status: Available.
   - For: Students / Male / Female.
   - Amenities: Wi-Fi, Meals, AC, CCTV Security, Laundry.
   - Rating: 4.8.
   - House Rules: No Smoking, 10 PM Curfew, No Outside Guests After 8 PM.
   - Contact Person: Rajesh Kumar (Property Manager).

2. **Skyline Premium** in Gurgaon, Sector 44:
   - Rent: ₹18,000/mo.
   - Status: Limited availability.
   - For: Young Professionals mainly.
   - Amenities: Free Wi-Fi, Gym, Meals, AC, Parking, active power backup.
   - Rating: 4.9.
   - House Rules: No Smoking, 10 PM Curfew, No Outside Guests After 8 PM.
   - Contact Person: Sarah D'souza (Hosting Manager).

3. **Narayan PG 2** in Hinjewadi, Pune (Near Swaraj Food Court):
   - Rent options: Double Sharing (₹8,500/month), Triple Sharing (₹7,000/month), Single occupancy starting from (₹15,000/month).
   - Status: Available / Co-living Space.
   - Amenities: AC Rooms, High-speed Wi-Fi, CCTV Security, Laundry, Meals Included, Power Backup, Daily Housekeeping, Parking.
   - Rating: 4.8.
   - House Rules: No Smoking, 10 PM Curfew, No Outside Guests After 8 PM.
   - Contact Person: Rajesh Kumar (Property Manager).

4. **Harmony House** in Hinjewadi, Pune:
   - Rent: ₹9,000/mo.
   - Status: Available.
   - Amenities: Wi-Fi, CCTV, Meals, Daily Housekeeping, beautiful indoor plants, small library.
   - Rating: 4.7.

5. **Skyview Premium PG** in Koramangala, Bangalore:
   - Rent: ₹14,500/mo.
   - Status: Available.
   - Amenities: Wi-Fi, Meals, AC, CCTV.
   - Rating: 4.8.

6. **Urban Oasis Coliving** in HSR Layout, Bangalore:
   - Rent: ₹12,000/mo.
   - Status: Limited availability.
   - Amenities: Wi-Fi, Laundry, CCTV Security.
   - Rating: 4.5.

7. **The Hive Studios** in Indiranagar, Bangalore:
   - Rent: ₹18,000/mo.
   - Status: Available.
   - Amenities: High-speed Wi-Fi, Gym, Meals, Power Backup, AC.
   - Rating: 4.9.

8. **Metropolitan PG** in Whitefield, Bangalore:
   - Rent: ₹11,000/mo.
   - Status: Available.
   - Amenities: Wi-Fi, Transport support, Meals, Power Backup.
   - Rating: 4.2.

If the guest wants to schedule a visit, direct them to click the "Book a Visit" button inside the PG details page or let them know you can help verify listings. Keep your answers brief, clean, and beautifully structured. No fluff.
`;

// Chat Support Route/Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message prompt is required." });
  }

  // fallback message generator if API_KEY is missing
  if (!ai) {
    return res.json({
      text: getFallbackResponse(message),
      note: "Note: Running in offline/fallback mode since GEMINI_API_KEY is not defined in Secrets panel."
    });
  }

  try {
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Add current user message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: supportSystemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I am here to help you find PG accommodation. How can I assist you?";
    return res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.json({
      text: "I encountered a minor issue connecting with the AI engine. However, I can let you know that our top PGs are 'Narayan PG 2' in Hinjewadi, Pune, and 'The Urban Retreat' in Koramangala, Bangalore! Would you like to check them out?",
      error: error.message
    });
  }
});

// Fallback logic for local replies
function getFallbackResponse(userMsg: string): string {
  const msg = userMsg.toLowerCase();
  if (msg.includes("pune") || msg.includes("hinjewadi")) {
    return "In Hinjewadi, Pune, we have **Narayan PG 2** starting at ₹7,000 (Triple sharing) up to ₹15,000 (Single). We also have **Harmony House** listed for ₹9,000/month. Both are available and co-living friendly!";
  }
  if (msg.includes("bangalore") || msg.includes("bengaluru") || msg.includes("koramangala")) {
    return "In Koramangala, Bangalore, we list **The Urban Retreat** (₹12,500/mo, 4.8 rating) and **Skyview Premium PG** (₹14,500/mo). We also have excellent rooms in HSR Layout and Indiranagar. Would you like to check search filter views?";
  }
  if (msg.includes("gurgaon") || msg.includes("delhi")) {
    return "In Gurgaon, we have **Skyline Premium** (Sector 44) available for ₹18,000/month with premium gym, air conditioning, and top professional amenities!";
  }
  if (msg.includes("rule") || msg.includes("curfew") || msg.includes("smoke")) {
    return "Most of our properties enforce a warm, secure environment: **10 PM Curfew**, **No Smoking** inside premises, and **No Outside Guests** in private rooms after 8 PM.";
  }
  return "Hello! I am your NestFinder support bot. I can guide you to find best student and professional PGs in Bangalore, Pune, and Gurgaon. Ask me about rent, amenities, or curfew rules!";
}

// Start Server Setup (with Vite integration)
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
