import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin } from '@lib/api';

type Credentials = { email: string; password: string };

export type UserProfile = {
  name: string;
  rank: string;
  role: string;
  unit: string;
  email: string;
};

type Persona = 'operator' | 'admin';

type AuthContextValue = {
  token: string | null;
  user: UserProfile | null;
  persona: Persona;
  switchPersona: (next: Persona) => void;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [storedUser, setStoredUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  });
  const [persona, setPersona] = useState<Persona>(() => {
    const raw = localStorage.getItem('auth_persona');
    return raw === 'admin' ? 'admin' : 'operator';
  });

  const adminProfile: UserProfile = useMemo(
    () => ({
      name: 'Gp. Capt. Suriya Kittisak',
      rank: 'Gp. Capt.',
      role: 'Cyber Range Commander',
      unit: 'RTAF Cyber Operations Center',
      email: 'suriya.kittisak@rtaf.mi.th'
    }),
    []
  );

  const user = useMemo<UserProfile | null>(() => {
    if (persona === 'admin') return adminProfile;
    return storedUser;
  }, [adminProfile, persona, storedUser]);

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    persona,
    switchPersona(next) {
      setPersona(next);
      localStorage.setItem('auth_persona', next);
    },
    async login(credentials) {
      const response = await apiLogin(credentials);
      setToken(response.token);
      setStoredUser(response.user);
      setPersona('operator');
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      localStorage.setItem('auth_persona', 'operator');
    },
    logout() {
      setToken(null);
      setStoredUser(null);
      setPersona('operator');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_persona');
    }
  }), [persona, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext) as AuthContextValue | null;
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
