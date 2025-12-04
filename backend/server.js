import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";                 // <-- ADD
import "./config/passport.js";                  // <-- ADD (your Google strategy)
import { transactionRouter } from "./routes/transactionRoute.js";
import { authRouter } from "./routes/authRoute.js";
import { aiRouter } from "./routes/aiRoutes.js";
import MongoStore from "connect-mongo";
import cors from "cors";
import { sanitizeInputs } from "./middleware/sanitize.js";

const app = express();
const PORT = process.env.PORT || 7000;

// -------------------- DB Connection --------------------
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { tls: true, serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- CORS --------------------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// -------------------- Middleware --------------------
app.use(express.json());
app.use(sanitizeInputs);

// -------------------- Session --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// -------------------- Passport --------------------
app.use(passport.initialize());      // <-- IMPORTANT
app.use(passport.session());         // <-- IMPORTANT

// -------------------- Routes --------------------
app.use("/api/transactions", transactionRouter);
app.use("/api/auth", authRouter);
app.use("/api", aiRouter);

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
