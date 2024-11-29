import "./App.css";
import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./Pages/LandingPage/LandingPage";


function App() {


  return (

    <StoryProvider>
      <LandingPage />
      </StoryProvider>
  );
}

export default App;

  
