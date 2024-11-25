import React from 'react';
import BackArrowIcon from './assets/BackArrow.svg'; 

interface BackArrowProps {
  onClick?: () => void; // Optional: Custom click behavior
}

const BackArrow: React.FC<BackArrowProps> = ({ onClick }) => {
  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Back button clicked!'); // Default action
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="absolute top-4 left-4 text-2xl cursor-pointer focus:outline-none"
   
    >
      {}
      <img src={BackArrowIcon} alt="Back Arrow" className="w-45px h-40px mr-25 mt-25 focus:outline-none" />
    </button>
  );
};

export default BackArrow;
