
import React from 'react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showImage?: boolean;
};

const Logo = ({ size = 'md', className = '', showImage = true }: LogoProps) => {
  const imageSize = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  if (!showImage) {
    return null;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/1c3c3f58-cc02-44b3-aaa1-8b16ea033444.png" 
        alt="Enterprise Logo" 
        className={`${imageSize[size]}`}
      />
    </div>
  );
};

export default Logo;
