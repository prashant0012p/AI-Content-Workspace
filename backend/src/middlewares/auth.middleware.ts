import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authMiddleware;
