import React from 'react';

const Spinner = ({
  size = 'md',
  color = 'terracotta',
  className = '',
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    terracotta: 'border-terracotta-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    navy: 'border-navy-500 border-t-transparent',
    beige: 'border-warmBeige-500 border-t-transparent',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          border-4 rounded-full animate-spin
          ${colors[color]}
        `}
      />
    </div>
  );
};

export default Spinner;