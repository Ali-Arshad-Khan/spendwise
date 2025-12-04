import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import { signup, login, logout } from "../controllers/authController.js";
import { getCurrentUser } from "../controllers/meController.js";

export const authRouter = express.Router();

// ----------------------
// Existing Email Auth
// ----------------------
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/me", getCurrentUser);

// ----------------------
// Google OAuth Start
// ----------------------
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ----------------------
// Google OAuth Callback
// ----------------------
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CORS_ORIGIN + "/login",
  }),
    (req, res) => {
         // user authenticated successfully
    req.session.userId = req.user.id; // <-- important
      res.redirect(`${process.env.CORS_ORIGIN}/login?googleLogin=true`);
    }
    );



export default authRouter;
