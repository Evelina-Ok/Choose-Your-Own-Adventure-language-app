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
  isLoading: boolean;
  sendAnswer: (text: string) => void;
  changeLanguage: (language: Language) => Promise<void>;
  changeReadingAge: (readingAge: LanguageProficiency) => Promise<void>;
  restartStory: (
    language?: Language,
    readingAge?: LanguageProficiency
  ) => Promise<void>;
  deleteStory: () => void;
}>({
  story: [],
  deleteStory: () => {},
  sendAnswer: async () => {},
  isLoading: false,
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (story.length !== 0 && story[story.length - 1].role === "user") {
      setIsLoading(true);
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
    setIsLoading(false);
  };

  const changeLanguage = async (newLanguage: Language) => {
    setLanguage(newLanguage);
    await restartStory(newLanguage, readingAge);
  };

  const changeReadingAge = async (newReadingAge: LanguageProficiency) => {
    setReadingAge(newReadingAge);
    await restartStory(language, newReadingAge);
  };

  const deleteStory = () => setStory((prev) => []);

  const restartStory = async (
    thisLanguage: Language = language,
    thisReadingAge: LanguageProficiency = readingAge
  ) => {
    setIsLoading((prev) => true);
    deleteStory();
    const result = await model.generateContent(
      initialPrompt(thisLanguage, thisReadingAge)
    );
    setStory((prev) => [
      { role: "model", parts: [{ text: result.response.text() }] },
    ]);
    setIsLoading((prev) => false);
  };

  // Define constants to pass to children
  let latestScenario: AIResponse | undefined = undefined;
  if (
    !isLoading &&
    story.length > 0 &&
    story[story.length - 1].role === "model"
  ) {
    const latestMessage = story[story.length - 1].parts[0].text;
    latestScenario = latestMessage && JSON.parse(latestMessage);
  }

  return (
    <StoryContext.Provider
      value={{
        story,
        latestScenario,
        sendAnswer,
        isLoading,
        changeLanguage,
        changeReadingAge,
        restartStory,
        deleteStory,
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
