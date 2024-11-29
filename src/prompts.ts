export const INTIIAL_PROMPT = `Let's create a "Choose Your Own Adventure" game. Start the story with an engaging opening and provide 3 distinct options for me to choose from. 
Only after I pick an option, continue the story coherently with 1-2 sentences and then provide the next 3 options. I will then choose an option again to allow us to continue with the story.
Maintain the continuity of the story and log all interactions. Provide a strict JSON-like response which always contains the following two fields: Scenario:string, options:string[]. Before sharing, triple check that the response is valid JSON that aligns with the provided schema.
`;
