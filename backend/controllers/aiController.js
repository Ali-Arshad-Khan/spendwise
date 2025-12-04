// controllers/aiController.js
import { askGemini } from "../services/aiServices.js";

export const askAiController = async (req, res) => {
  try {
    const { question, userData } = req.body;

    if (!question || !userData) {
      return res.status(400).json({ error: "Question and data are required" });
    }

    const response = await askGemini(question, userData);

    return res.json({ answer: response });
  } catch (error) {
    console.error("AI Controller Error:", error.message);
    return res.status(500).json({ error: "Something went wrong with the AI service." });
  }
};
