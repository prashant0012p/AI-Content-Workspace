import api from "./api";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard = () =>
  api.get<DashboardResponse>("/dashboard");