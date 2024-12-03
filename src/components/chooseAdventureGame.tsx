import { useEffect, useState } from "react";
import { useStory } from "../providers/storyProvider";
import { Options } from "./options";

export function ChooseAdventureGame() {
  const {
    latestScenario,
    isLoading,
    sendAnswer,
    story,
    restartStory,
    deleteStory,
  } = useStory();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOnSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleOnConfirm = async () => {
    if (isLoading) return; // don't allow multiple prompts to be sent
    if (selectedOption) {
      await sendAnswer(selectedOption);
    } else {
      // TODO: store some error message somewhere. here or the provider
      console.log("No option selected");
    }
  };

  if (story.length === 0 && !isLoading)
    return (
      <button
        onClick={async () => {
          await restartStory();
        }}
      >
        Start story
      </button>
    );

  if (!latestScenario) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <div className="text-center text-white"> 
      <h1 className="my-6 mb-10 text-6xl font-bold font-['Amatic_SC']">Choose Your Adventure</h1>

      </div>
      <div>
        <div
          className={`mb-10 py-2 px-3 rounded-xl bg-gray-200 text-black text-left"
          }`}
        >
          {latestScenario?.scenario}
        </div>
      </div>
      {isLoading ? (
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
       <div>
      <button
        onClick={async () => {
          await deleteStory();
        }}
      >
        Delete story
      </button>
      <button
        onClick={async () => {
          await restartStory();
        }}
      >
        Restart story
      </button>
      </div>
    </div>
  );
}
