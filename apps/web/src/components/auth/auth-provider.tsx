'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@/lib/api';

type User = {
  id: string;
  googleId: string;
  email: string;
  username: string;
  name: string | null;
  picture: string | null;
  locale: 'ko' | 'en' | 'ja';
  currency: 'KRW' | 'USD' | 'JPY' | 'EUR';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.auth.me.$get();
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /* Existing logic */
  const login = () => {
    window.location.href = api.auth.login.google.$url().toString();
  };


  const loginWithEmail = async (email: string, password: string) => {
    const res = await api.auth.login.email.$post({
      json: { email, password },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    await fetchUser();
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string,
  ) => {
    const res = await api.auth.signup.email.$post({
      json: { email, password, name },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Signup failed');
    }
    await fetchUser();
  };

  const logout = async () => {
    try {
      await api.auth.logout.$post();

      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithEmail,
        signupWithEmail,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
