import { Language, LanguageProficiency } from "../types";

export const initialPrompt = (
  language: Language,
  readingAge: LanguageProficiency
) => `Let's create a "Choose Your Own Adventure" game with Christmas adventure theme in a fantasy land to help people learn the ${language} with a language skill of ${readingAge}. Start the story with an engaging opening and provide 3 distinct options for me to choose from. 
Only after I pick an option, continue the story coherently with 1-2 sentences and then provide the next 3 options. I will then choose an option again to allow us to continue with the story.
All of your responses should be in ${language} and suitable for ${readingAge} readers.
Maintain the continuity of the story and log all interactions. Provide a strict JSON-like response which always contains the following two fields: Scenario:string, options:string[]. Before sharing, triple check that the response is valid JSON that aligns with the provided schema.
`;
