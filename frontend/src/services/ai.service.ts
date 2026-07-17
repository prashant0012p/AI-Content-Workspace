import api from "./api";
import type { AssistantRequestBody, GenerateContentParams } from "../types/ai";

export const generateContent = (data: GenerateContentParams) =>
  api.post("/ai/generate", data);

export const assistant = (data: AssistantRequestBody) =>
  api.post("/ai/assistant", data);