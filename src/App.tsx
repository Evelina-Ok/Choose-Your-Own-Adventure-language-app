
import "./App.css";


import { StoryProvider } from "./providers/storyProvider";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { FlagPage } from "./Pages/FlagPage/FlagPage";


function App() {


  return (

    <StoryProvider>
      <FlagPage />
      </StoryProvider>
  );
}

export default App;

  
