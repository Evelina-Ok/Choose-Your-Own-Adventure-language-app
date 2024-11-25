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
    <ListenBttn />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <form className="card" onSubmit={async () => await handleSubmit}>
        <p>Write text to change to speech</p>
        <input
          onChange={(e) => setText(e.target.value)}
          className="border-zinc-500 border-2 rounded-lg"
        ></input>
        <button>Submit</button>
      </form>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
