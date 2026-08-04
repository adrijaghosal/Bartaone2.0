import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  position = 'top-right',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      icon: FiCheckCircle,
      bg: 'bg-green-600/90',
      border: 'border-green-500',
      text: 'text-green-100',
    },
    error: {
      icon: FiXCircle,
      bg: 'bg-red-600/90',
      border: 'border-red-500',
      text: 'text-red-100',
    },
    warning: {
      icon: FiAlertTriangle,
      bg: 'bg-yellow-600/90',
      border: 'border-yellow-500',
      text: 'text-yellow-100',
    },
    info: {
      icon: FiInfo,
      bg: 'bg-blue-600/90',
      border: 'border-blue-500',
      text: 'text-blue-100',
    },
  };

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const TypeIcon = types[type].icon;

  return (
    <div
      className={`
        fixed z-50 ${positions[position]}
        transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div
        className={`
          flex items-center gap-3 px-5 py-4
          ${types[type].bg} ${types[type].border}
          backdrop-blur-sm border
          rounded-2xl shadow-2xl
          min-w-[300px] max-w-md
        `}
      >
        <TypeIcon className="w-5 h-5 flex-shrink-0" />
        <p className={`flex-1 text-sm font-medium ${types[type].text}`}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/70 hover:text-white transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;