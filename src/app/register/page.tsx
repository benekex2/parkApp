'use client';

import { useState } from 'react';
import { Language } from '@/graphql/generated';
import { useAuth } from '@/context/AuthContext';
import { validateEmail } from '@/utils/validation';
import { Header } from '@/components/Header';
import { Error } from '@/components/Error';
import { Input } from '@/components/Input';
import { InputEmail } from '@/components/InputEmail';
import Link from 'next/link';
import { Select } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';

export default function RegisterPage() {
  const { register, setError, error, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<Language>(Language.English);
  const [terms, setTerms] = useState(false);

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
    register(email, password, name, language, terms);
  };

  return (
    <div className="w-full">
      <Header>
        <div className="flex pt-10">
          <h1 className="text-[2rem] leading-[2.5rem] font-bold pl-5 pt-1">Register</h1>
        </div>
      </Header>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl space-y-4">
        <Input label="Name" name="name" onChange={(e) => setName(e.target.value)} />
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
          error={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select
          label="Language"
          value={language}
          error={error}
          name="language"
          options={Object.values(Language)}
          optionLabels={{ [Language.English]: 'English', [Language.Polish]: 'Polski' }}
          onChange={(e) => setLanguage(e.target.value as Language)}
        />
        <Checkbox
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          label="Accept terms & conditions"
          error={error}
          name="terms"
          required
        />
        <Error error={error} />
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary m-0 text-white py-2 rounded-xl"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <Link
          href={'/login'}
          className="w-full border border-primary text-primary py-2 rounded-xl text-center block mt-2 transition-colors hover:bg-primary hover:text-white"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
