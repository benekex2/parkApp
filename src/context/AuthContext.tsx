'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation, useRegisterUserMutation, Language } from '@/graphql/generated';

interface AuthContextType {
  token: string | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setError: Dispatch<SetStateAction<string | null>>;
  register: (
    name: string,
    email: string,
    password: string,
    language: Language,
    terms: boolean
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loginUserMutation, { loading: loginLoading }] = useLoginUserMutation();
  const [registerUserMutation, { loading: registerLoading }] = useRegisterUserMutation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await loginUserMutation({ variables: { email, password } });
      if (data?.loginUser?.token) {
        const token = data.loginUser.token;
        setToken(token);
        localStorage.setItem('auth-token', token);
        router.push('/');
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    language: Language,
    terms: boolean
  ) => {
    setLoading(true);
    try {
      const { data } = await registerUserMutation({
        variables: { name, email, password, language, terms },
      });
      if (data?.registerUser?.status) {
        router.push('/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth-token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        error,
        setError,
        login,
        logout,
        register,
        loading: loading || loginLoading || registerLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
