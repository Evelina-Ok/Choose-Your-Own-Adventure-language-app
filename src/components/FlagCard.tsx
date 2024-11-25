import React from 'react';

interface FlagCardProps {
  country: string;
  image: string;
}

const FlagCard: React.FC<FlagCardProps> = ({ country, image }) => {
  return (
    <div className=" rounded-lg  p-4 flex flex-col items-center">
      {}
      <img
        src={image}
        alt={`${country} flag`}
        className="w-20 h-20 object-cover rounded-full mb-2"
      />
      <h2 className="text-lg font-semibold">{country}</h2>
    </div>
  );
};

export default FlagCard;
