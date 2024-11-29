import { useState } from "react";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";
import { LandingPage } from "./pages/LandingPage/LandingPage";

function App() {
  const [text, setText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    console.log(text);
    const audio = await textToSpeech(text);
    audio?.play();
  };

  return (
    <>    
    <LandingPage />
      <form className="card" onSubmit={async () => await handleSubmit}>
        <p>Write text to change to speech</p>
        <input
          onChange={(e) => setText(e.target.value)}
          className="border-zinc-500 border-2 rounded-lg"
        ></input>
        <button>Submit</button>
      </form>
      
    </>
  );
}

export default App;

  