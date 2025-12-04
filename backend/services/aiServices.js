// services/aiService.js
import dotenv from "dotenv";
dotenv.config();   // MUST be first
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askGemini = async (question, data) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a helpful personal finance assistant. 
Only use the financial data provided. Do not guess.

User financial data:
${JSON.stringify(data)}

User question:
${question}

Provide a clear and concise answer based only on the data.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("Failed to process Gemini request.");
  }
};
