import { type Response } from "express";
import Activity from "../models/activity.model";
import { AuthRequest } from "../types/express";
import { generateFromGemini, assistantFromGemini } from "../services/gemini.service";

export const generateContent = async (req: AuthRequest, res: Response) => {
  const { contentType, topic, audience, tone, instructions } = req.body as {
    contentType?: string;
    topic?: string;
    audience?: string;
    tone?: string;
    instructions?: string;
  };

  const generated = await generateFromGemini({
    contentType,
    topic,
    audience,
    tone,
    instructions,
  });

  await Activity.create({
    contentType: contentType ?? "AI content",
    action: "Generated",
    topic,
    user: req.userId,
  });

  res.json({ success: true, data: generated });
};

export const assistant = async (req: AuthRequest, res: Response) => {
  const { content, action, model } = req.body as {
    content?: string;
    action?: string;
    model?: string;
  };

  const updated = await assistantFromGemini({ content, action, model });

  await Activity.create({
    contentType: "Assistant",
    action: action ?? "Assistant",
    user: req.userId,
  });

  res.json({ success: true, data: updated });
};