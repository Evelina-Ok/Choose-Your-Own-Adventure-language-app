import { FormEvent, useEffect, useState } from "react";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-pro"});

let PROMPT =  `Let's create a "Choose Your Own Adventure" game. Start the story with an engaging opening and provide 3 distinct options for me to choose from. 
Only after I pick an option, continue the story coherently with 1-2 sentences and then provide the next 3 options.The again, only I choose an option continue with the story.
Maintain the continuity of the story and log all interactions. Do not add new line delimiters or titles in your response. Do not use symbols except for numbers.
Options should be defined as returned as "Option 1-3"`;

interface Message {
    role: string;
    parts: string;
}

export function ChooseAdventureGame () {
    const [messages, setMessages] = useState<Message[]>([]); // Stores the entire story
    const [userInput, setUserInput] = useState(""); // Tracks user's chosen option
    const [chat, setChat] = useState<ChatSession | null>(); // AI chat session

    useEffect(() => {
        const chatSession = model.startChat({
            generationConfig: {
                maxOutputTokens: 800,
            },
        });
        setChat(chatSession);
    }, []);

useEffect(() => {
    (async () => {
        if (chat) {
            const result = await chat.sendMessage(PROMPT);
            const response = result.response;
            const text = response.text();
            setMessages((prevMessages) => [
                ...prevMessages,
                { parts: text, role: "model"},
            ]);
        }
    })();
}, [chat]);

const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    //Add user choice to the messages
    const userChoice = { role: "user", parts: userInput };
    setMessages((prevMessages) => [...prevMessages, userChoice]);

    //Reset input
    setUserInput("");

    if (chat) {
        const result = await chat.sendMessage(userInput); //Send user input as a message
        const response = result.response;
        const text = response.text();

        // Add AI's continuation of the story
        const aiMessage = { role: "model", parts: text};
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
};

return (
    <div>
        <div> Choose Your Adventure </div>
        <div>{messages.map((message, index) => (
            <div key={index} className={`mb-2 py-2 px-3 rounded-xl ${
                message.role === "user"
                  ? "bg-blue-500 text-white text-right self-end"
                  : "bg-gray-200 text-black text-left"
              }`}>
                {message.parts}
            </div>
        ))}
        </div>
        <form
        className="flex items-center p-4 w-full"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          className="flex-grow rounded-lg p-2 mr-2 border-2 w-full text-black"
          placeholder="Choose an option (e.g., 1, 2, or 3)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
);
}
