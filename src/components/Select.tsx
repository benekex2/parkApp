import React from 'react';

interface SelectProps<T extends string> {
  label?: string;
  value: T;
  options: readonly T[];
  optionLabels?: Record<T, string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export function Select<T extends string>({
  label,
  value,
  options,
  optionLabels,
  onChange,
  className = '',
}: SelectProps<T>) {
  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${className}`}
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
