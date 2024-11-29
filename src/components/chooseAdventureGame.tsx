import { useEffect, useState } from "react";
import { useStory } from "../providers/storyProvider";
import { Options } from "./options";

export function ChooseAdventureGame() {
  const { latestScenario, isUpdating, sendAnswer } = useStory();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOnSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleOnConfirm = async () => {
    if (isUpdating) return; // don't allow multiple prompts to be sent
    if (selectedOption) {
      await sendAnswer(selectedOption);
      console.log("prompt sent");
    } else {
      // TODO: store some error message somewhere. here or the provider
      console.log("No option selected");
    }
  };

  if (!latestScenario) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div> Choose Your Adventure </div>
      <div>
        <div
          className={`mb-2 py-2 px-3 rounded-xl bg-gray-200 text-black text-left"
          }`}
        >
          {latestScenario?.scenario}
        </div>
      </div>
      {isUpdating ? (
        <div>Thinking...</div>
      ) : (
        <>
          <Options
            options={latestScenario?.possibleOptions}
            onSelect={handleOnSelect}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleOnConfirm}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}