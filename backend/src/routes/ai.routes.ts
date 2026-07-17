import { Router } from "express";
import { generateContent, assistant } from "../controllers/ai.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/generate", authMiddleware, generateContent);
router.post("/assistant", authMiddleware, assistant);

export default router;
