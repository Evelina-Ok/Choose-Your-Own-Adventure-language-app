import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoryProvider } from "./providers/storyProvider";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { FlagPage } from "./Pages/FlagPage/FlagPage";
import { GamePage } from "./Pages/GamePage/GamePage";

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
