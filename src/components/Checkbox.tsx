import React from 'react';
import { ErrorType } from './Error';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  className?: string;
  error?: ErrorType;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
  required = false,
  className = '',
  error,
}) => (
  <label className={`flex items-center space-x-2 ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      name={name}
      required={required}
      className={`accent-primary ${error?.field === name ? 'ring-2 ring-red-600 border-red-600' : ''}`}
    />
    {label && <span className={`${error?.field === name ? 'text-red-600' : ''}`}>{label}</span>}
  </label>
);
