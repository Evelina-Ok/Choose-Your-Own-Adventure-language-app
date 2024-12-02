import Button from "../../components/button";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStory } from "../../providers/storyProvider";
export function LandingPage() {
  const { story } = useStory();
  return (
    <div className="bg-gray-700 flex justify-center h-screen w-screen">
      <div className="text-center text-white">
        <h1 className="my-40 mb-36 text-8xl font-bold font-['Amatic_SC']">
          TALK TO ME
        </h1>
        <div>
          {story.length === 0 ? (
            <Button text="START" />
          ) : (
            <>
              <Button text="CONTINUE" />
              <Button text="CHAPTERS" />
              
              <NavLink to={"/language"}>
              <Button text="START GAME IN ANOTHER LANGUAGE" />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

















