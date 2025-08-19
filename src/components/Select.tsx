import React from 'react';
import { ErrorType } from './Error';

interface SelectProps<T extends string> {
  label?: string;
  value: T;
  options: readonly T[];
  optionLabels?: Record<T, string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: ErrorType;
  name?: string;
}

export function Select<T extends string>({
  label,
  value,
  options,
  optionLabels,
  onChange,
  className = '',
  error,
  name,
}: SelectProps<T>) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}
      <select
        id={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${error?.field === name ? 'border-red-600' : ''} ${className}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {optionLabels?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
