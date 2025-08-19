import { DangerIcon } from '@/assets/icons/danger';
import React from 'react';

interface ErrorProps {
  error?: string | null;
}

export const Error: React.FC<ErrorProps> = ({ error }) =>
  error && (
    <p
      className={`text-red-600 text-sm mt-1 border-2 border-red-600 rounded-xl p-4 bg-red-200 whitespace-pre-line flex`}
    >
      <DangerIcon fill="red" className="w-8 h-8 mr-2" />
      <p className="pl-2">{error}</p>
    </p>
  );
