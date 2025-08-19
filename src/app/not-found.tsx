'use client';

import { ArrowLeftIcon } from '@/assets/icons/arrowLeft';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full">
      <Header>
        <div className="flex pt-10">
          <button
            className="p-2 w-10 h-10 border-2 border-navy-900 rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[2rem] font-poppins leading-[2.5rem] font-bold pl-5 pt-1">404</h1>
        </div>
      </Header>
      <p className="text-4xl font-bold text-center mb-6 pt-10">Page not found.</p>
      <Link href="/" className="block mx-auto w-fit text-2xl text-primary text-center underline">
        Back to home
      </Link>
    </div>
  );
}
