import { useState } from "react";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";

import { LandingPage } from "./pages/LandingPage/LandingPage";

import { StoryProvider } from "./providers/storyProvider";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";


function App() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // prevent page reload
  //   console.log(text);
  //   const audio = await textToSpeech(text);
  //   audio?.play();
  // };

  return (
    <StoryProvider>
      <ChooseAdventureGame />
       </StoryProvider>
  );
}

export default App;

  