import "./App.css";

import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";

function App() {
  return (
    <StoryProvider>
      <ChooseAdventureGame />
    </StoryProvider>
  );
}

export default App;
