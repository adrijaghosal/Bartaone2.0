import React from 'react';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'circle',
  status = null,
  className = '',
  children,
  ...props
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const variants = {
    circle: 'rounded-full',
    square: 'rounded-xl',
    rounded: 'rounded-lg',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative inline-block">
      <div
        className={`
          ${sizes[size]}
          ${variants[variant]}
          flex items-center justify-center
          bg-gradient-to-br from-terracotta-500/30 to-navy-700/50
          border-2 border-warmBeige-500/20
          overflow-hidden
          ${className}
        `}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : children ? (
          children
        ) : (
          <span className="font-medium text-warmBeige-200">
            {getInitials(alt)}
          </span>
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            w-3 h-3
            rounded-full border-2 border-navy-900
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

export default Avatar;