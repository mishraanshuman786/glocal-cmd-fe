import { api } from "../axios";

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  roleId: string;
  roleName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: AuthUser;
}

export interface MeResponse {
  success: boolean;
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },

  async getCurrentUser(): Promise<MeResponse> {
    const response = await api.get<MeResponse>("/auth/me");
    return response.data;
  },

  async logout(): Promise<LogoutResponse> {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Patch /auth/change-password
  async changePassword(
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> {
    const response = await api.patch<ChangePasswordResponse>(
      "auth/change-password",
      payload,
    );
    return response.data;
  },
};
