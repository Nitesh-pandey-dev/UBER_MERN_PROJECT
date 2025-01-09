import React from 'react';

const LoadingLine = () => {
  return (
    <div className="w-[80%] bg-gray-200 h-[4px] rounded-full relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-blue-500 h-full animate-loading-line"></div>
    </div>
  );
};

export default LoadingLine;
