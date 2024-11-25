import React from 'react';
import BackIcon from './assets/BackIcon'; 

interface BackIconProps {
  onClick?: () => void; // Opcjonalna funkcja do obsługi kliknięcia
}
const BackIcon: React.FC<BackIconProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-4 left-4 text-2xl cursor-pointer"
    >
      ← {/* Zastąp ten symbol ikoną, jeśli chcesz */}
    </div>
  );
};
export default BackIcon;