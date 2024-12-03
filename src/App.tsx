import { useState } from "react";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";

import { StoryProvider } from "./providers/storyProvider";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";
import { LandingPage } from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <StoryProvider>
      <LandingPage />
    </StoryProvider>
  );
}

export default App;
