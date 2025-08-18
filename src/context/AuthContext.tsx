'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations/loginUser';

type User = { id: string; email: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loginMutation] = useMutation(LOGIN_USER);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('auth-user');
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      if (data?.loginUser?.token) {
        const { token, user } = data.loginUser;
        setToken(token);
        setUser(user);
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-user', JSON.stringify(user));
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
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
