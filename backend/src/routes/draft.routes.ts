import { Router } from "express";
import {
  getDrafts,
  createDraft,
  updateDraft,
  deleteDraft,
} from "../controllers/draft.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getDrafts);
router.post("/", authMiddleware, createDraft);
router.patch("/:id", authMiddleware, updateDraft);
router.delete("/:id", authMiddleware, deleteDraft);

export default router;
