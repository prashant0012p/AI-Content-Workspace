import { Router } from "express";
import { getPreferences, updatePreferences } from "../controllers/preference.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getPreferences);
router.patch("/", authMiddleware, updatePreferences);

export default router;
