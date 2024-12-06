import { useState } from "react";
import { useStory } from "../hooks/useStory";
import { Options } from "./options";

export function Game() {
  const { isLoading, latestScenario, sendAnswer } = useStory();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const GameContent = () => {
    if (isLoading) return <div>Loading...</div>;
    if (!latestScenario) return null;

    const handleOnConfirm = () => {
      if (isLoading) return; // don't allow multiple prompts to be sent
      sendAnswer(selectedOption);
      setSelectedOption("");
    };

    const handleOnSelect = (option: string) => {
      setSelectedOption(option);
    };

    return (
      <>
        <div
          className={`mb-10 py-2 px-3 rounded-xl bg-gray-200 text-black text-left"
            }`}
        >
          {latestScenario?.scenario}
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Options
            options={latestScenario?.possibleOptions}
            onSelect={handleOnSelect}
            selectedOption={selectedOption}
          />

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-full px-8 w-32 ${
              !selectedOption && "opacity-50"
            }`}
            onClick={selectedOption ? handleOnConfirm : undefined}
          >
            Submit
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="p-4 bg-gradient-to-b from-backgroundTop to-backgroundBttn min-h-screen w-dvw flex flex-col items-center">
      <div className="my-10 mb-10">
        <h1 className="text-6xl pt-4 font-bold font-['Jersey_10']">
          Your christmas adventure
        </h1>
      </div>

      <GameContent />
    </div>
  );
}
