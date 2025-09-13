import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'w-full py-2 px-4 rounded-xl font-medium transition-colors cursor-pointer focus:outline-none';

  const variants = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-900',
    secondary: 'bg-white text-gray-900 hover:bg-gray-200',
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}
