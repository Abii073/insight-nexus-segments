
import React from 'react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-brand-500">Neuro</span>
      <span className="text-gray-700">Segment</span>
      <span className="text-brand-500">.</span>
    </div>
  );
};

export default Logo;
