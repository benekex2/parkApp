import { Keys } from '@/assets/keys';
import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="relative wp-100 h-60 bg-gradient-to-b from-orange-300 to-yellow-200 p-6 mb-12 rounded-b-2xl shadow-md">
      {children}
      <Keys className="absolute right-0 -bottom-4" />
    </header>
  );
};
