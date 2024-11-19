import { useState } from "react";

export const Home = () => {
  const [text, setText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    console.log(text);
    // const audio = await textToSpeech(text);

    // try and reduce api usage by using a local file whilst testing
    const audio = new Audio(
      "blob:http://localhost:5173/d7371e70-970d-490e-ab78-22acbb386627"
    );
    audio?.play();
  };

  return (
    <>
      <h1>Heading 1</h1>
      <form className="card" onSubmit={handleSubmit}>
        <p>Write text to change to speech</p>
        <input
          onChange={(e) => setText(e.target.value)}
          className="border-zinc-500 border-2 rounded-lg"
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};
