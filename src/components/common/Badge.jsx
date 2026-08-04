import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  icon = null,
  ...props
}) => {
  const variants = {
    primary: 'bg-terracotta-500/20 text-terracotta-400 border-terracotta-500/30',
    secondary: 'bg-navy-700/50 text-warmBeige-300 border-navy-600',
    success: 'bg-green-600/20 text-green-400 border-green-500/30',
    danger: 'bg-red-600/20 text-red-400 border-red-500/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
    info: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    glass: 'bg-white/10 text-warmBeige-100 border-white/20 backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const roundedClasses = {
    full: 'rounded-full',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        border
        font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${roundedClasses[rounded]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;