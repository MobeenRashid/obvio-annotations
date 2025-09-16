import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  tooltip?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  tooltip,
  className,
}) => {
  const [imageError, setImageError] = useState(false);
  const [hover, setHover] = useState(false);

  const initials = name
    .split(' ')
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  const showFallback = !src || imageError;
  const tooltipLabel = tooltip || name;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={clsx(
          'flex items-center justify-center rounded-xl bg-gray-800 hover:border-2 hover:border-gray-600 text-white font-semibold overflow-hidden cursor-pointer',
          'h-10 w-10',
          className
        )}
      >
        {showFallback ? (
          <span aria-label={name}>{initials}</span>
        ) : (
          <Image
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            width={40}
            height={40}
          />
        )}
      </div>

      {hover && (
        <div className="absolute top-full mb-2 start-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-md z-10">
          {tooltipLabel}
        </div>
      )}
    </div>
  );
};

export default Avatar;
