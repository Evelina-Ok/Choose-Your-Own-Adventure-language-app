import { useEffect, useMemo, useState } from "react";
import { textToSpeech } from "../utils/textToSpeech";
import { useAudio } from "../hooks/useAudio";

type OptionsProps = {
  options: [string, string, string];
  onSelect: (option: string) => void;
  selectedOption: string;
};

export const Options = ({
  options,
  onSelect,
  selectedOption,
}: OptionsProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {options.map((option, index) => {
        console.log(selectedOption === option);

        return (
          <Option
            key={index}
            text={option}
            onClick={() => onSelect(option)}
            isSelected={selectedOption === option}
          />
        );
      })}
    </div>
  );
};

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  isSelected: boolean;
}

const Option = ({ text, isSelected = false, ...props }: OptionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnPlay = async () => {
    if (isPlaying) return;
    setIsPlaying((prev) => true);
    await textToSpeech(text);
    setIsPlaying((prev) => false);
  };

  return (
    <div
      className={`w-80 px-4 bg-white text-black font-'Antic' text-1xl py-3 rounded-full flex justify-between  ${
        isSelected && "bg-red-200"
      }`}
      {...props}
    >
      <div className="text-left">{text}</div>
      <div
        onClick={async () => await handleOnPlay()}
        className="w-8 h-8 rounded-full bg-black/50 text-white"
        role="button"
        aria-disabled={isPlaying}
      >
        <img
          src="src/assets/speaker.svg" // our image
          alt="Play"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
