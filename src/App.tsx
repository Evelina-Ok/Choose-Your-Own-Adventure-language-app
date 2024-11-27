import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { textToSpeech } from "./utils/textToSpeech";
import { ListenBttn } from "./components/ButtonListen/ButtonListen"

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
