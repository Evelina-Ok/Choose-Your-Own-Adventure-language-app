import { createContext } from "react";
import { Language, LanguageProficiency } from "../../types";
import { Story, AIResponse } from "../providers/storyProvider";

export const StoryContext = createContext<{
  story: Story;
  latestScenario: AIResponse | undefined;
  isLoading: boolean;
  sendAnswer: (text: string) => void;
  changeLanguage: (language: Language) => void;
  changeReadingAge: (readingAge: LanguageProficiency) => void;
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
