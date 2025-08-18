'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PilotPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome, {user.email} 🚀</h1>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
