import "./App.css";

import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";
import Microphone from "./components/microphone";
import BackArrow from "./components/BackArrow";
import { ListenBttn } from "./components/ButtonListen/ButtonListen";

function App() {
  return (
    <StoryProvider>
     
      <ChooseAdventureGame />
    </StoryProvider>
  );
}

export default App;
