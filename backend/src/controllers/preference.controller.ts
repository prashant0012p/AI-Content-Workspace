import { type Response } from "express";
import Preference from "../models/preference.model";
import { AuthRequest } from "../types/express";

export const getPreferences = async (req: AuthRequest, res: Response) => {
  const preferences = await Preference.findOne({ user: req.userId });

  res.json({ success: true, data: preferences ?? {} });
};

export const updatePreferences = async (req: AuthRequest, res: Response) => {
  const preferences = await Preference.findOneAndUpdate(
    { user: req.userId },
    { ...req.body, user: req.userId },
    {
      new: true,
      upsert: true,
    }
  );

  res.json({ success: true, data: preferences });
};
