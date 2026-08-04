import React from 'react';

const Skeleton = ({
  variant = 'text',
  width = '100%',
  height = '20px',
  className = '',
  count = 1,
}) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded-lg',
    avatar: 'rounded-full',
    card: 'rounded-2xl',
    image: 'rounded-xl',
    button: 'rounded-xl',
  };

  const skeletonItems = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`
        animate-pulse bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700
        bg-[length:200%_100%] animate-shimmer
        ${variants[variant]}
        ${className}
      `}
      style={{
        width: variant === 'avatar' ? height : width,
        height: variant === 'avatar' ? height : height,
      }}
    />
  ));

  return <>{skeletonItems}</>;
};

export default Skeleton;