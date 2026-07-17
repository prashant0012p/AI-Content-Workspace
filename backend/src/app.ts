import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import aiRoutes from "./routes/ai.routes";
import draftRoutes from "./routes/draft.routes";
import preferenceRoutes from "./routes/preference.routes";


dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/drafts", draftRoutes);
app.use("/api/preferences", preferenceRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});



export default app;
