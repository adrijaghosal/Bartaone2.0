import React from 'react';

const EmptyState = ({
  title = 'Nothing to see here',
  description = 'No items available at the moment.',
  icon = null,
  action = null,
  className = '',
}) => {
  return (
    <div className={`
      flex flex-col items-center justify-center
      p-12 text-center
      ${className}
    `}>
      {icon && (
        <div className="mb-4 text-6xl text-warmBeige-500/30">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-warmBeige-100 mb-2">
        {title}
      </h3>
      <p className="text-warmBeige-400 max-w-md">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;