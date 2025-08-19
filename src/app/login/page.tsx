'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { InputEmail } from '@/components/InputEmail';
import { Error } from '@/components/Error';
import Link from 'next/link';
import { validateEmail } from '@/utils/validation';

export default function LoginPage() {
  const { login, setError, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError({
        message: 'Please use correct formatting.\nExample: address@email.com',
        field: 'email',
      });
      return;
    }
    setError(null);
    login(email, password);
  };

  return (
    <div className="w-full">
      <Header>
        <div className="flex pt-10">
          <h1 className="text-[2rem] font-poppins leading-[2.5rem] font-bold pl-5 pt-1">
            Logowanie
          </h1>
        </div>
      </Header>
      <form className="bg-white p-6 rounded-2xl space-y-4" onSubmit={handleSubmit}>
        <InputEmail
          label="Email"
          name="email"
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error error={error} />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary m-0 text-white py-2 rounded-xl"
        >
          {loading ? 'Logging...' : 'Login'}
        </button>
        <Link
          href={'/register'}
          className="w-full border border-primary text-primary py-2 rounded-xl text-center block mt-2 transition-colors hover:bg-primary hover:text-white"
        >
          Register
        </Link>
      </form>
    </div>
  );
}
