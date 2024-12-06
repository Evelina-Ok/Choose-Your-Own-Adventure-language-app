import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./_pages/LandingPage/LandingPage";
import { FlagPage } from "./_pages/FlagPage/FlagPage";
import { GamePage } from "./_pages/GamePage/GamePage";

function App() {
  return (
    <StoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route index element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/language" element={<FlagPage />} />
        </Routes>
      </BrowserRouter>
    </StoryProvider>
  );
}

export default App;
