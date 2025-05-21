
import React from 'react';

const BackgroundGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"
        aria-hidden="true"
      />
    </div>
  );
};

export default BackgroundGradient;
