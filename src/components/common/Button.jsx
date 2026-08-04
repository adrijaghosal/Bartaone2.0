import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  const variants = {
    primary: 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-lg hover:shadow-terracotta-500/25',
    secondary: 'bg-navy-700 hover:bg-navy-600 text-warmBeige-100 border border-navy-500',
    outline: 'bg-transparent hover:bg-navy-800 text-warmBeige-100 border border-warmBeige-500/30 hover:border-warmBeige-500',
    ghost: 'bg-transparent hover:bg-navy-800/50 text-warmBeige-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    glass: 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-warmBeige-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
    xl: 'px-9 py-4 text-xl',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'opacity-70 cursor-wait' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default Button;