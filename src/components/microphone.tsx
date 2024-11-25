import React from 'react';
import MicrophoneIcon from 'src/assets/Microphone.svg'; // Path to the microphone SVG icon

interface MicrophoneProps {
  onClick?: () => void; // Optional: Define behavior when the microphone is clicked
}

const Microphone: React.FC<MicrophoneProps> = ({ onClick }) => {
  const handleMicrophoneClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Microphone activated!'); // Default action
    }
  };

  return (
    <button
      onClick={handleMicrophoneClick}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
      aria-label="Activate Microphone"
    >
      <img src={MicrophoneIcon} alt="Microphone Icon" className="w-6 h-6" />
    </button>
  );
};

export default Microphone;
