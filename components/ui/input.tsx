import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...props}
        className={clsx(
          'block w-full rounded-xl border border-gray-400 px-4 py-2 outline-none',
          'bg-white placeholder-gray-500 text-gray-900',
          'focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none',
          className
        )}
      />
    </div>
  );
}
