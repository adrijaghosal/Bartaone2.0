import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  touched = false,
  required = false,
  disabled = false,
  className = '',
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseClasses = `
    w-full px-4 py-3
    bg-navy-800/50 backdrop-blur-sm
    border ${error && touched ? 'border-red-500' : 'border-warmBeige-500/20'}
    rounded-xl
    text-warmBeige-100 placeholder-warmBeige-500/50
    focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-transparent
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-warmBeige-200 mb-2">
          {label}
          {required && <span className="text-terracotta-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseClasses}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-warmBeige-500 hover:text-warmBeige-300 transition-colors"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
        {icon && iconPosition === 'right' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-warmBeige-500">
            {icon}
          </span>
        )}
      </div>
      {error && touched && (
        <p className="mt-1 text-sm text-red-500 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;