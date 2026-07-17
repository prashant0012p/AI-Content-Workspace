import api from "./api";
import type { CreateDraftBody, UpdateDraftBody } from "../types/draft";

export const saveDraft = (data: CreateDraftBody) =>
  api.post("/drafts", data);

export const getDrafts = (search = "") =>
  api.get(`/drafts?search=${search}`);

export const updateDraft = (id: string, data: UpdateDraftBody) =>
  api.patch(`/drafts/${id}`, data);

export const deleteDraft = (id: string) =>
  api.delete(`/drafts/${id}`);