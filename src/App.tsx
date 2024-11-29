
import "./App.css";


import { StoryProvider } from "./providers/storyProvider";
import { ChooseAdventureGame } from "./components/chooseAdventureGame";


function App() {


  return (

    <StoryProvider>
      <ChooseAdventureGame />
      </StoryProvider>
  );
}

export default App;

  
