import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
const router = Router();
router.post("/api/auth/login", login);
router.post("/api/auth/signup", signup);
export default router;
