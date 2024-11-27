import { createContext } from "react";

type Message  = {
    role: string;
    parts: string;
  }

const StoryContext = createContext(Message[])