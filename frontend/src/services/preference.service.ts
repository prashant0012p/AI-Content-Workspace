import api from "./api";

export const getPreferences = () =>
  api.get("/preferences");

export const updatePreferences = (data: Record<string, unknown>) =>
  api.patch("/preferences", data);