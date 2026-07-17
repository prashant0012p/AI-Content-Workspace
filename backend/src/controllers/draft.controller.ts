import { type Response } from "express";
import Draft from "../models/draft.model";
import Activity from "../models/activity.model";
import { AuthRequest } from "../types/express";

export const getDrafts = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const search = String(req.query.search ?? "").toLowerCase();
  const baseQuery = { user: userId };

  const searchQuery = search
    ? {
        $or: [
          { contentType: { $regex: search, $options: "i" } },
          { topic: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const drafts = await Draft.find({ ...baseQuery, ...searchQuery }).sort({ createdAt: -1 });

  res.json({ success: true, data: drafts });
};

export const createDraft = async (req: AuthRequest, res: Response) => {
  const draft = await Draft.create({
    ...req.body,
    user: req.userId,
  });

  await Activity.create({
    contentType: draft.contentType,
    action: "Saved Draft",
    topic: draft.topic,
    user: req.userId,
  });

  res.status(201).json({ success: true, data: draft });
};

export const updateDraft = async (req: AuthRequest, res: Response) => {
  const draft = await Draft.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  if (!draft) {
    return res.status(404).json({ success: false, message: "Draft not found" });
  }

  res.json({ success: true, data: draft });
};

export const deleteDraft = async (req: AuthRequest, res: Response) => {
  const draft = await Draft.findOneAndDelete({ _id: req.params.id, user: req.userId });

  if (!draft) {
    return res.status(404).json({ success: false, message: "Draft not found" });
  }

  await Activity.create({
    contentType: draft.contentType,
    action: "Deleted Draft",
    topic: draft.topic,
    user: req.userId,
  });

  res.json({ success: true, message: "Draft deleted" });
};
