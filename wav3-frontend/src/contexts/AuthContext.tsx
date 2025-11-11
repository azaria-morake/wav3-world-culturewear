import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginRedirect: (intent: PendingAction) => void;
  logout: () => void;
  resolvePendingAction: (intent: string) => Promise<void>;
}

interface PendingAction {
  type: 'ADD_WISHLIST' | 'ADD_CART' | 'CHECKOUT';
  payload: any;
  timestamp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const loginRedirect = (intent: PendingAction) => {
    const encodedIntent = btoa(JSON.stringify(intent));
    sessionStorage.setItem('pendingAction', JSON.stringify(intent));
    
    const redirectUrl = `${import.meta.env.VITE_BACKEND_AUTH}?redirect=${
      encodeURIComponent(window.location.href)
    }&intent=${encodeURIComponent(encodedIntent)}`;
    
    window.location.href = redirectUrl;
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      // Silent fail
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const resolvePendingAction = async (intent: string) => {
    try {
      const pendingAction: PendingAction = JSON.parse(atob(intent));
      // Implement action resolution based on type
      console.log('Resolving pending action:', pendingAction);
    } catch (error) {
      console.error('Failed to resolve pending action:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loginRedirect,
      logout,
      resolvePendingAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};