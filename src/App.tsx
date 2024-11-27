import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </StoryProvider>
  );
}

export default App;
