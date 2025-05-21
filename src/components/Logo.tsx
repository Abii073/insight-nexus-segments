
import React from 'react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showImage?: boolean;
};

const Logo = ({ size = 'md', className = '', showImage = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const imageSize = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  return (
    <div className={`font-bold flex items-center ${sizeClasses[size]} ${className}`}>
      {showImage && (
        <img 
          src="/lovable-uploads/1c3c3f58-cc02-44b3-aaa1-8b16ea033444.png" 
          alt="Octagon Logo" 
          className={`mr-2 ${imageSize[size]}`}
        />
      )}
      <span className="text-gray-700">octagon</span>
      <span className="text-brand-500">.</span>
    </div>
  );
};

export default Logo;
