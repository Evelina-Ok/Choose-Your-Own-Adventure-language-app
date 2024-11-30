import { createContext, useContext, useEffect, useState } from "react";
import { Language, LanguageProficiency, schema } from "../../types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { initialPrompt } from "../prompts";
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
  sendAnswer: (text: string) => void;
  changeLanguage: (language: Language) => Promise<void>;
  changeReadingAge: (readingAge: LanguageProficiency) => Promise<void>;
  restartStory: (
    language: Language,
    readingAge: LanguageProficiency
  ) => Promise<void>;
}>({
  story: [],
  sendAnswer: async () => {},
  isUpdating: false,
  latestScenario: undefined,
  changeLanguage: async () => {},
  changeReadingAge: async () => {},
  restartStory: async () => {},
});

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [story, setStory] = useState<Story>([]);
  const [readingAge, setReadingAge] =
    useState<LanguageProficiency>("Beginner (A1)");
  const [language, setLanguage] = useState<Language>("American");

  useEffect(() => {
    console.log("story", story);
    console.log("readingAge", readingAge);
    console.log("language", language);
  }, [story, readingAge, language]);

  useEffect(() => {
    if (!story.length) restartStory(language, readingAge);
    else if (story[story.length - 1].role === "user") {
      getScenarioFromAI();
    }
  }, [story]);

  const addToStory = (addition: UserResponse | ModelResponse) => {
    setStory((prev) => [...prev, addition]);
  };

  const sendAnswer = async (answer: string) => {
    addToStory({ role: "user", parts: [{ text: answer }] });
  };

  const getScenarioFromAI = async () => {
    const result = await model.generateContent({ contents: story });
    addToStory({ role: "model", parts: [{ text: result.response.text() }] });
  };

  const changeLanguage = async (newLanguage: Language) => {
    setLanguage(newLanguage);
    await restartStory(newLanguage, readingAge);
  };

  const changeReadingAge = async (newReadingAge: LanguageProficiency) => {
    setReadingAge(newReadingAge);
    await restartStory(language, newReadingAge);
  };

  const restartStory = async (
    language: Language,
    readingAge: LanguageProficiency
  ) => {
    const result = await model.generateContent(
      initialPrompt(language, readingAge)
    );
    setStory([{ role: "model", parts: [{ text: result.response.text() }] }]);
  };

  // Define constants to pass to children
  const isUpdating =
    story.length === 0 || story[story.length - 1].role === "user";
  let latestScenario: AIResponse | undefined = undefined;
  if (!isUpdating) {
    const latestMessage = story[story.length - 1].parts[0].text;
    latestScenario = latestMessage && JSON.parse(latestMessage);
  }

  return (
    <StoryContext.Provider
      value={{
        story,
        latestScenario,
        sendAnswer,
        isUpdating,
        changeLanguage,
        changeReadingAge,
        restartStory: () => restartStory(language, readingAge),
      }}
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
