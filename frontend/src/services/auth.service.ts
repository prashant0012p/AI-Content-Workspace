import api from "./api";
import type { LoginBody, LoginResponse } from "../types/auth";

export const login = (data: LoginBody) =>
  api.post<LoginResponse>("/auth/login", data);