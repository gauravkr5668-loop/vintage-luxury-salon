import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of Gemini client to prevent startup crashes if GEMINI_API_KEY is not set
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));

  // API Endpoint for AI Beauty & Style Consultation
  app.post("/api/consult", async (req, res) => {
    try {
      const { image, mimeType, services, includeTrends } = req.body;

      if (!image || !mimeType) {
        res.status(400).json({ error: "Missing image data or mimeType" });
        return;
      }

      const client = getGeminiClient();
      let trendContext = "";

      // Step 1: Use Google Search Grounding if requested to match recent luxury salon trends in Pitampura/Delhi
      if (includeTrends) {
        try {
          const searchResponse = await client.models.generateContent({
            model: "gemini-3.5-flash",
            contents: "What are the latest premium luxury hair styling, haircut, hair color, and skin treatments trends currently popular in Pitampura, Rani Bagh, and North Delhi for men and women? Please retrieve real and actual up-to-date local fashion, style preferences, and popular look categories.",
            config: {
              tools: [{ googleSearch: {} }],
            },
          });
          trendContext = searchResponse.text || "";
        } catch (searchErr) {
          console.error("Search Grounding Error (proceeding without search context):", searchErr);
          trendContext = "Latest luxury styling trends in Delhi emphasize rich chocolate balayage, soft butterfly cuts, hydrafacials, and glass skin skin-care routines.";
        }
      }

      // Step 2: Use gemini-3.1-pro-preview for image understanding and professional styling advice
      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: image,
        },
      };

      const systemInstruction = `You are an elite, award-winning creative stylist, skin therapist, and brand director at "Vintage Luxury Salon" located in Sant Nagar, Rani Bagh, Pitampura, Delhi.
You provide exquisite, quiet luxury, highly customized styling advice based on a client's portrait.
Analyze their facial features (such as face shape, structure, and symmetry), hair length/texture, and skin tone.
Match them with the high-end editorial salon menu: Hair Styling, Hair Colour, Hair Spa, Skin Treatments, Facials, Bridal Makeup, Nail Services, Waxing, and Spa & Wellness.

Provide the recommendations in a valid JSON format with the following keys:
- faceShapeAnalysis: Description of facial structure, hair length/texture, and skin tone.
- haircutRecommendation: Haircut or styling shape recommendation.
- hairColorRecommendation: Hair color options suitable for their skin tone.
- skinRecommendation: Skin treatments or facials recommendation.
- servicesOfChoice: Specific services from the salon menu that would benefit them most.
- trendingMatch: How these styles align with current premium Delhi fashion trends (especially Rani Bagh & Pitampura).

The tone must be sophisticated, respectful, personalized, and editorial. Do not include markdown code blocks inside the JSON fields themselves. Only output the final JSON object.`;

      const promptText = `Analyze this portrait and provide bespoke styling advice.
Selected Services of Interest: ${services && services.length > 0 ? services.join(", ") : "All premium services"}
${trendContext ? `Include Delhi Trend Matcher insights. Local trend context: ${trendContext}` : "Provide classic editorial luxury options."}

Please output ONLY the JSON object conforming to this schema:
{
  "faceShapeAnalysis": "...",
  "haircutRecommendation": "...",
  "hairColorRecommendation": "...",
  "skinRecommendation": "...",
  "servicesOfChoice": ["...", "..."],
  "trendingMatch": "..."
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [imagePart, { text: promptText }]
        },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              faceShapeAnalysis: { type: Type.STRING },
              haircutRecommendation: { type: Type.STRING },
              hairColorRecommendation: { type: Type.STRING },
              skinRecommendation: { type: Type.STRING },
              servicesOfChoice: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              trendingMatch: { type: Type.STRING }
            },
            required: [
              "faceShapeAnalysis",
              "haircutRecommendation",
              "hairColorRecommendation",
              "skinRecommendation",
              "servicesOfChoice",
              "trendingMatch"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content from Gemini model.");
      }

      const analysisResult = JSON.parse(responseText.trim());
      res.json(analysisResult);

    } catch (err: any) {
      console.error("Consultation Error:", err);
      res.status(500).json({
        error: "Failed to perform consultation",
        details: err.message || "Unknown error occurred"
      });
    }
  });

  // Mock booking endpoint
  app.post("/api/bookings", (req, res) => {
    const { name, phone, service, date, time } = req.body;
    if (!name || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Please fill all booking fields." });
      return;
    }
    res.json({
      success: true,
      booking: {
        id: `VNTG-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone,
        service,
        date,
        time,
        status: "Confirmed"
      }
    });
  });

  // Serve static files and integrate Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
