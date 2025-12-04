// routes/aiRoutes.js
import express from "express";
import { askAiController } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js"

export const aiRouter = express.Router();

aiRouter.post("/ask-ai",auth,askAiController);


