import { useState } from "react";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";


import { StoryProvider } from "./providers/storyProvider";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";


function App() {


  return (

    <StoryProvider>
      <ChooseAdventureGame />

  );
}

export default App;

  