import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin } from '@lib/api';

type Credentials = { email: string; password: string };

type UserProfile = {
  name: string;
  rank: string;
  role: string;
  unit: string;
  email: string;
};

type AuthContextValue = {
  token: string | null;
  user: UserProfile | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  });

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    async login(credentials) {
      const response = await apiLogin(credentials);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    },
    logout() {
      setToken(null);
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext) as AuthContextValue | null;
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
