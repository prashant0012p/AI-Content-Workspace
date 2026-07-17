import { type Response } from "express";
import Draft from "../models/draft.model";
import Activity from "../models/activity.model";
import { AuthRequest } from "../types/express";

export const getDashboard = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const drafts = await Draft.find({ user: userId }).sort({ createdAt: -1 }).limit(3);
  const activities = await Activity.find({ user: userId }).sort({ createdAt: -1 }).limit(10);

  const generated = activities.filter((item) => item.action === "Generated").slice(0, 3);

  res.json({
    success: true,
    data: {
      summary: {
        totalGenerated: activities.filter((item) => item.action === "Generated").length,
        totalDrafts: await Draft.countDocuments({ user: userId }),
        totalActivities: activities.length,
      },
      recentGenerated: generated,
      recentDrafts: drafts,
      recentActivities: activities.slice(0, 3),
    },
  });
};
