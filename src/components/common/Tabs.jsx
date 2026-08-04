import React, { useState } from 'react';

const Tabs = ({
  tabs = [],
  defaultTab = 0,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  const variants = {
    default: 'bg-navy-800/50 border border-navy-700',
    pills: 'gap-2',
    underline: 'border-b-2 border-navy-700',
  };

  const getTabClasses = (index) => {
    const isActive = activeTab === index;

    if (variant === 'pills') {
      return `
        px-5 py-2.5 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-terracotta-500 text-white shadow-lg shadow-terracotta-500/25' 
          : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
        }
      `;
    }

    if (variant === 'underline') {
      return `
        px-5 py-2.5 border-b-2 transition-all duration-300
        ${isActive 
          ? 'border-terracotta-500 text-warmBeige-100' 
          : 'border-transparent text-warmBeige-400 hover:text-warmBeige-100'
        }
      `;
    }

    return `
      px-5 py-2.5 rounded-lg transition-all duration-300
      ${isActive 
        ? 'bg-terracotta-500/20 text-terracotta-400' 
        : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/30'
      }
    `;
  };

  return (
    <div className="w-full">
      <div className={`
        flex ${variant === 'pills' ? 'flex-wrap gap-1' : 'space-x-1'}
        p-1
        ${variants[variant]}
        rounded-xl
        ${className}
      `}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={getTabClasses(index)}
            disabled={tab.disabled}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${activeTab === index 
                    ? 'bg-terracotta-500/20 text-terracotta-300' 
                    : 'bg-navy-700/50 text-warmBeige-400'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;