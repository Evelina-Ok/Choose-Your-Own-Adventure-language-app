import { createContext, useContext, useEffect, useState } from "react";
import { schema } from "../../types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTIIAL_PROMPT } from "../prompts";
import type { Content } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseSchema: schema,
    responseMimeType: "application/json",
  },
});

interface UserResponse extends Omit<Content, "role"> {
  role: "user";
}

interface ModelResponse extends Omit<Content, "role"> {
  role: "model";
}

type Story = Array<UserResponse | ModelResponse>;

type AIResponse = {
  possibleOptions: [string, string, string];
  scenario: string;
};

// initialises the chat and stores the story
// stores the story so we can re-use again
const StoryContext = createContext<{
  story: Story;
  latestScenario: AIResponse | undefined;
  isUpdating: boolean;
  isNew: boolean;
  sendAnswer: (text: string) => Promise<void>;
}>({
  story: [],
  sendAnswer: async () => {},
  isUpdating: false,
  isNew: true,
  latestScenario: undefined,
});

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [story, setStory] = useState<Story>([]);

  useEffect(() => {
    if (!story.length || story[story.length - 1].role === "user") {
      getScenarioFromAI();
    }
  }, [story]);

  const isUpdating =
    story.length === 0 || story[story.length - 1].role === "user";

  const addToStory = (addition: UserResponse | ModelResponse) => {
    setStory((prev) => [...prev, addition]);
  };

  const sendAnswer = async (answer: string) => {
    addToStory({ role: "user", parts: [{ text: answer }] });
  };

  const getScenarioFromAI = async () => {
    if (!story.length) {
      const result = await model.generateContent(INTIIAL_PROMPT);
      addToStory({ role: "model", parts: [{ text: result.response.text() }] });
    } else {
      const result = await model.generateContent({ contents: story });
      addToStory({ role: "model", parts: [{ text: result.response.text() }] });
    }
  };

  let latestScenario: AIResponse | undefined = undefined;
  if (!isUpdating) {
    const latestMessage = story[story.length - 1].parts[0].text;
    latestScenario = latestMessage && JSON.parse(latestMessage);
  }
const isNew = story.length<2
  return (
    <StoryContext.Provider
      value={{ story, latestScenario, sendAnswer, isUpdating, isNew }}
    >
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
