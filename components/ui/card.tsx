// components/ui/card.tsx
import { ReactNode } from 'react';
import cn from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
