import React from 'react';
import FlagCard from './/components/FlagCard';
import './App.css';
import BackArrow from './/components/BackArrow'; 
function App() {
  const flags = [
    { country: 'American', image: 'src/assets/usaFlag.svg' },
    { country: 'Spanish', image: 'src/assets/SpainFlag.svg' },
    { country: 'Icelandic', image: 'src/assets/IcelandFlag.svg' },
    { country: 'Italian', image: 'src/assets/ItalyFlag.svg' },
    { country: 'Polish', image: 'src/assets/PolandFlag.svg' },
    { country: 'Norwegian', image: 'src/assets/NorwayFlag.svg' },
    { country: 'German', image: 'src/assets/GermanFlag.svg' },
    { country: 'Danish', image: 'src/assets/DenmarkFlag.svg' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-500 flex flex-col items-center px-4 py-8">

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        CHOOSE LANGUAGE
      </h1>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        YOU WANT TO LEARN
      </h1>

      {}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flags.map((flag) => (
          <FlagCard key={flag.country} country={flag.country} image={flag.image} />
        ))}
      </div>
    </div>
  );
}

export default App;
