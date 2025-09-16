import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive';
}

const Button = ({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'w-auto flex gap-2 items-center justify-center py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer focus:outline-none';

  const variants = {
    default: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:bg-gray-400',
    outline:
      'bg-transparent text-gray-900 border border-gray-200 hover:bg-gray-200 focus:bg-gray-300',
    primary: 'bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-900',
    secondary: 'bg-white text-gray-900 hover:bg-gray-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:bg-red-800',
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
