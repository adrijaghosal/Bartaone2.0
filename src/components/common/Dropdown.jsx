import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  label = '',
  error = '',
  disabled = false,
  className = '',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const baseClasses = `
    w-full px-4 py-3
    bg-navy-800/50 backdrop-blur-sm
    border ${error ? 'border-red-500' : 'border-warmBeige-500/20'}
    rounded-xl
    text-warmBeige-100
    focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
    transition-all duration-300
    cursor-pointer
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-warmBeige-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={baseClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? 'text-warmBeige-100' : 'text-warmBeige-500/70'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <FiChevronDown
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 py-2 bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-slideDown">
            {options.length === 0 ? (
              <div className="px-4 py-2 text-warmBeige-500 text-center">No options</div>
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  className={`
                    px-4 py-2.5 cursor-pointer transition-all duration-200
                    hover:bg-terracotta-500/20 hover:text-warmBeige-100
                    ${option.value === value ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-300'}
                  `}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;