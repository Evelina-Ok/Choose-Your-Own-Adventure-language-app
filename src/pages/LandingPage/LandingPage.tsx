import Button from "../../components/button";
import { useStory } from "../../providers/storyProvider";
import BackArrow from "../../components/BackArrow";

export function LandingPage() {
  const { story } = useStory();

  return (
    <div className="bg-gray-700 flex justify-center items-center h-screen w-screen relative">
      {/* BackArrow positioned in the top-left corner */}
      <BackArrow onClick={() => console.log("Back to previous page")} />

      <div className="text-center text-white">
        <h1 className="my-40 mb-36 text-8xl font-bold font-['Amatic_SC']">
          TALK TO ME
        </h1>

        {story.length === 0 ? (
          <Button text="START" />
        ) : (
          <>
            <Button text="CONTINUE" />
            <Button text="CHAPTERS" />
            <Button text="START GAME IN ANOTHER LANGUAGE" />
          </>
        )}
      </div>
    </div>
  );
}
