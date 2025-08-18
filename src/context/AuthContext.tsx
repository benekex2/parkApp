'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/graphql/generated';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loginUserMutation] = useLoginUserMutation();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUserMutation({ variables: { email, password } });
      if (data?.loginUser?.token) {
        const token = data.loginUser.token;
        setToken(token);
        localStorage.setItem('auth-token', token);
        router.push('/pilot');
      } else {
        alert('Invalid login response');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    router.push('/login');
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
