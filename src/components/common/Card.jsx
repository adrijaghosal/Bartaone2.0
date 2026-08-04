import React from 'react';

const Card = ({
  children,
  variant = 'glass',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const variants = {
    glass: 'bg-white/5 backdrop-blur-md border border-white/10',
    dark: 'bg-navy-800/50 border border-navy-700',
    gradient: 'bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-navy-700',
    elevated: 'bg-navy-800/30 shadow-2xl shadow-navy-900/50 border border-navy-700',
    outline: 'bg-transparent border-2 border-warmBeige-500/20',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const baseClasses = `
    rounded-2xl
    transition-all duration-300
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-terracotta-500/10 cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;