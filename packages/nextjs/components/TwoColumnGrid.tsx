import React, { ReactNode } from 'react';

interface TwoColumnGridProps {
  children: ReactNode[];
  className?: string;
}

const TwoColumnGrid: React.FC<TwoColumnGridProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-4 
        w-full
        ${className}
      `}
    >
      {children.map((child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default TwoColumnGrid;