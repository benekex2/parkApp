'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="bg-white p-6 rounded-2xl shadow-lg w-80 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
        }}
      >
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
