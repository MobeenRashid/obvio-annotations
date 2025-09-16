import { AlertTriangle } from 'lucide-react';
import cn from 'clsx';
import React from 'react';

type AlertProps = {
  children: React.ReactNode;
  variant?: 'error' | 'success' | 'info';
  className?: string;
};

const variants = {
  error: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  info: 'bg-blue-600 text-white',
};

const Alert = ({ children, variant = 'error', className }: AlertProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border px-3 py-4 rounded-xl text-sm',
        variants[variant],
        className
      )}
      role="alert"
    >
      {variant === 'error' ? (
        <AlertTriangle className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
