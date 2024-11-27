import { FormEvent, useEffect, useState } from "react";
import { ChatSession, GoogleGenerativeAI} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let PROMPT = `Let's create a "Choose Your Own Adventure" game. Start the story with an engaging opening and provide 3 distinct options for me to choose from. 
Only after I pick an option, continue the story coherently with 1-2 sentences and then provide the next 3 options. Then again, only when I choose an option continue with the story.
Maintain the continuity of the story and log all interactions. Do not add new line delimiters, titles or bold text in your response. Do not use symbols except for numbers.
`;



export function ChooseAdventure() {
    const chatSession = model.startChat({
        generationConfig: {
          maxOutputTokens: 800,
        },
      });
  const [messages, setMessages] = useState<Message[]>([]); // Stores the entire story
  const [userInput, setUserInput] = useState(""); // Tracks user's chosen option
  const [options, setOptions] = useState<string[]>([]); // Tracks the current options
  const [chat, setChat] = useState<ChatSession | null>(chatSession); // AI chat session


  useEffect(() => {
    (async () => {
      if (chat) {
        const result = await chat.sendMessage(PROMPT);
        const response = result.response;
        const text = response.text();

        // Extract options and set state
        const newOptions = extractOptions(text);
        setOptions(newOptions);

        setMessages((prevMessages) => [
          ...prevMessages,
          { parts: text, role: "model" },
        ]);
      }
    })();
  }, [chat]);

  const extractOptions = (text: string): string[] => {
    const regex = /Option\s\d.*?(?=Option|$)/g;
    return text.match(regex)?.map((opt) => opt.trim()) || [];
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user's choice to the messages
    const userChoice = { role: "user", parts: `Option ${userInput}` };
    setMessages((prevMessages) => [...prevMessages, userChoice]);

    // Reset input
    setUserInput("");

    if (chat) {
      const result = await chat.sendMessage(`Option ${userInput}`);
      const response = result.response;
      const text = response.text();

      // Extract new options
      const newOptions = extractOptions(text);
      setOptions(newOptions);

      // Add AI's continuation of the story
      const aiMessage = { role: "model", parts: text };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  };

  return (
    <div>
      <div>Choose Your Adventure</div>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 py-2 px-3 rounded-xl ${
              message.role === "user"
                ? "bg-blue-500 text-white text-right self-end"
                : "bg-gray-200 text-black text-left"
            }`}
          >
            {message.parts}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg border-2 ${
              userInput === `${index + 1}` ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setUserInput(`${index + 1}`)}
          >
            {option}
          </button>
        ))}
      </div>
      <form className="flex items-center p-4 w-full" onSubmit={sendMessage}>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
          disabled={!userInput}
        >
          Submit
        </button>
      </form>
    </div>
  );
}