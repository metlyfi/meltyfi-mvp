import React from 'react';
import CustomCard from './Card';
import TwoColumnGrid from './TwoColumnGrid';
import Image from 'next/image';

interface CardItem {
  title: string;
  image: string;
  text: string;
}

interface CardLoopProps {
  items: CardItem[];
}

const CardLoop: React.FC<CardLoopProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <CustomCard key={index} className='p-3'>
          <div className="">
              <h2 className="text-choco text-center text-2xl font-bold">{item.title}</h2>
          </div>
            
          <div className="flex items-center space-x-4 text-choco">
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={200}
              className="w-48 h-48 object-cover" // Per garantire che l'immagine mantenga la dimensione 200x200
            />
            <div className="flex-1 text-sm">
              {item.text}
            </div>
          </div>

        </CustomCard>
      ))}
    </>
  );
};

export default CardLoop;