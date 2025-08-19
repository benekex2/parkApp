import { DangerIcon } from '@/assets/icons/danger';
import React from 'react';

export type ErrorType = { message: string; field: string | 'query' } | null;

interface ErrorProps {
  error?: ErrorType;
}

export const Error: React.FC<ErrorProps> = ({ error }) =>
  error ? (
    <div
      className="text-red-600 text-sm mt-1 border-2 border-red-600 rounded-xl p-4 bg-red-200 whitespace-pre-line flex"
      role="alert"
      aria-live="assertive"
    >
      <DangerIcon fill="red" className="w-8 h-8 mr-2" />
      <div className="pl-2">
        {error.field === 'query' && (
          <span className="block text-xs mt-1 text-red-700">Server error:</span>
        )}
        <span>{error.message}</span>
      </div>
    </div>
  ) : null;
