import { useState } from "react";
import { useStory } from "../hooks/useStory";
import { Options } from "./options";

export function Game() {
  const { latestScenario, isLoading, sendAnswer, restartStory } = useStory();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOnSelect = (option: string) => {
    setSelectedOption(option);
  };

  const StartButton = () => {
    if (!latestScenario && !isLoading)
      return (
        <button
          onClick={async () => {
            await restartStory();
          }}
          className="text-slate-950"
        >
          Start story
        </button>
      );
  };

  const GameContent = () => {
    if (!latestScenario) return null;

    const handleOnConfirm = () => {
      if (isLoading) return; // don't allow multiple prompts to be sent
      if (selectedOption) {
        sendAnswer(selectedOption);
        setSelectedOption("");
      } else {
        // TODO: store some error message somewhere. here or the provider
        console.log("No option selected");
      }
    };

    return (
      <div className="flex-col flex h-full">
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
      </div>
    );
  };

  return (
    <div className="flex-col flex justify-start h-full">
      <div className="text-center text-white">
        <h1 className="my-6 mb-10 text-6xl font-bold font-['Amatic_SC']">
          Choose Your Adventure
        </h1>
        {isLoading && <div>Loading...</div>}
        <StartButton />
        <GameContent />
      </div>
    </div>
  );
}
