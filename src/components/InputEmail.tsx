import React from 'react';
import { ErrorType } from './Error';

interface InputEmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: ErrorType;
}

export const InputEmail: React.FC<InputEmailProps> = ({
  label,
  value,
  error,
  onChange,
  ...props
}) => (
  <div className="w-full mb-2">
    {label && <label className={`block text-base`}>{label}</label>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border p-2 focus:outline-none ${
        error?.field === props.name
          ? `border-2 border-red-600 bg-red-100`
          : 'border-secondary bg-white'
      }`}
      {...props}
    />
  </div>
);
