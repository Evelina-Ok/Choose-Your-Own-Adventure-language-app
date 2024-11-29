import React, { useEffect, useState } from "react";

const ChooseChapter: React.FC = () => {
  const chapters = [
    "lvl1",
    "lvl2",
    "lvl3",
    "lvl4",
    "lvl5",
    "lvl6",
    "lvl7",
    "lvl8",
  ];
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );

  const generatePositions = () => {
    const generated: { top: number; left: number }[] = [];
    const verticalSpacing = 12;
    const maxVerticalPosition = 85;

    for (let i = 0; i < chapters.length; i++) {
      const topPosition = Math.min(
        maxVerticalPosition,
        verticalSpacing * (i + 1)
      );
      generated.push({
        top: topPosition,
        left: Math.random() * 80,
      });
    }

    setPositions(generated);
  };

  useEffect(() => {
    generatePositions();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-200 relative overflow-hidden p-4">
      <h1 className="text-3xl font-bold text-center my-4 sm:my-8">
        Choose Chapter
      </h1>
      <h2 className="text-xl text-center mb-4 sm:mb-6">Chapter 1</h2>{" "}
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute bg-blue-500 text-white flex items-center justify-center rounded-full text-base sm:text-lg font-semibold shadow-lg"
          style={{
            width: "60px",
            height: "60px",
            top: `${pos.top}%`,
            left: `${pos.left}%`,
          }}
        >
          {chapters[index]}
        </div>
      ))}
    </div>
  );
};

export default ChooseChapter;
