import { createContext, useContext, useEffect, useState } from "react";
import { schema, type Message } from "../../types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTIIAL_PROMPT } from "../prompts";
import { generateContent, sendPromptToAI } from "../utils/sendPromptToAI";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseSchema: schema,
    responseMimeType: "application/json",
  },
});

type MessageAndSelectedOption = [scenario: Message, answer: string | null];

// initialises the chat and stores the story
// stores the story so we can re-use again
const StoryContext = createContext<{
  story: MessageAndSelectedOption[];
  isUpdating: boolean;
  sendAnswer: (text: string) => Promise<void>;
}>({ story: [], sendAnswer: async () => {}, isUpdating: false });

const chatSession = model.startChat({
  generationConfig: {
    maxOutputTokens: 800,
    responseSchema: schema,
  },
});

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [story, setStory] = useState<MessageAndSelectedOption[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(true);

  // Scenario from the AI
  const addScenario = (scenario: string) => {
    if (story.length === 0) {
      setStory([[{ role: "ai", parts: scenario }, null]]);
    } else {
      setStory([...story, [{ role: "ai", parts: scenario }, null]]);
    }
  };

  const addAnswer = (option: string) => {
    const tmp = [...story];
    tmp[tmp.length - 1][1] = option;
    setStory(tmp);
  };

  const getScenario = async (prompt: string) => {
    // const scenario = await sendPromptToAI(chatSession, prompt);
    // addScenario(scenario);
    setIsUpdating(false);
  };

  const sendAnswer = async (answer: string) => {
    setIsUpdating(true);
    addAnswer(answer);
    await getScenario(answer);
  };

  useEffect(() => {
    generateContent(model, "GIVE me a scenario");
    // send initial prompt
    if (!story.length) {
      getScenario(INTIIAL_PROMPT);
    } else
      console.log("should send current story at this stage so we can continue");

    return () => {
      // cleanup and remove the chat session
    };
  }, []);

  // we need some way to return options to the user
  // we need some way to allow users to see previous Q and As and restart their journey from a point they choose
  return (
    <StoryContext.Provider value={{ story, sendAnswer, isUpdating }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
