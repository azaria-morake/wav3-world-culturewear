import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await api.get('/api/auth/me');
    return response.data.user;
  },

  async refreshToken(): Promise<void> {
    // Implementation for token refresh if needed
    await api.post('/api/auth/refresh');
  }
};