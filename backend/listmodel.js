import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY, // ensure correct key
});

async function listModels() {
  try {
    const response = await genAI.models.list(); // ✅ correct method
    console.log(response);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
