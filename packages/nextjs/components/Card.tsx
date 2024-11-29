import React, { ReactNode } from 'react';

interface CustomCardProps {
  children: ReactNode;
  className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        border-[5px] 
        border-[#7B3F00] 
        bg-[#F1DBAC] 
        bg-opacity-20
        rounded-tl-[55px] 
        rounded-br-[55px] 
        rounded-tr-none 
        rounded-bl-none
        
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default CustomCard;