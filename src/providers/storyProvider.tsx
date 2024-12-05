import { useState } from "react";
import { type Language, type LanguageProficiency, schema } from "../../types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { initialPrompt } from "../prompts";
import type { Content } from "@google/generative-ai";
import { StoryContext } from "../contexts/storyContext";

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

export type Story = Array<UserResponse | ModelResponse>;

export type AIResponse = {
  possibleOptions: [string, string, string];
  scenario: string;
};

// initialises the chat and stores the story
// stores the story so we can re-use again

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [story, setStory] = useState<Story>([]);
  const [readingAge, setReadingAge] =
    useState<LanguageProficiency>("Beginner (A1)");
  const [language, setLanguage] = useState<Language>("American");
  const [isLoading, setIsLoading] = useState(false);

  // Functions to manipulate the story state
  const addToStory = (addition: UserResponse | ModelResponse) => {
    const updatedStory = [...story, addition];
    setStory(updatedStory);
    return updatedStory; // return so we don't rely on state being updated
  };

  const deleteStory = () => {
    setStory([]);
  };

  const sendAnswer = (answer: string) => {
    setIsLoading(true);
    const userResponse: UserResponse = {
      role: "user",
      parts: [{ text: answer }],
    };
    const updatedStory = addToStory(userResponse);
    getScenarioFromAI(updatedStory);
  };

  const getScenarioFromAI = async (story: Story) => {
    const result = await model.generateContent({ contents: story });
    const modelResponse: ModelResponse = {
      role: "model",
      parts: [{ text: result.response.text() }],
    };
    addToStory(modelResponse);
    setIsLoading(false);
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    restartStory(newLanguage, readingAge);
  };

  const changeReadingAge = (newReadingAge: LanguageProficiency) => {
    setReadingAge(newReadingAge);
    restartStory(language, newReadingAge);
  };

  const restartStory = async (
    thisLanguage: Language = language,
    thisReadingAge: LanguageProficiency = readingAge
  ) => {
    setIsLoading(true);
    deleteStory();

    try {
      const result = await model.generateContent(
        initialPrompt(thisLanguage, thisReadingAge)
      );
      const modelResponse: ModelResponse = {
        role: "model",
        parts: [{ text: result.response.text() }],
      };
      addToStory(modelResponse);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setIsLoading(false);
    }
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
