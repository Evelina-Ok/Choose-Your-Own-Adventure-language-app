import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { FlagPage } from "./pages/FlagPage/FlagPage";
import { GamePage } from "./pages/GamePage/GamePage";

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
