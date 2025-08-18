'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterUserMutation, Language, RegisterUserMutation } from '@/graphql/generated';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<Language>(Language.English);
  const [terms, setTerms] = useState(false);

  const [registerUser, { loading, error }] = useRegisterUserMutation({
    onCompleted: (data: RegisterUserMutation) => {
      if (data.registerUser?.status) {
        router.push('/login');
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      variables: { name, email, password, language, terms },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="w-full p-2 border rounded"
        >
          <option value={Language.English}>English</option>
          <option value={Language.Polish}>Polski</option>
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            required
          />
          <span>Accept terms & conditions</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}
