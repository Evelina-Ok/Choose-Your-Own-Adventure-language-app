import { ResponseSchema, SchemaType } from "@google/generative-ai";

export type Message = {
  role: string;
  parts: string;
};

export const schema: ResponseSchema = {
  description:
    "A scenario with a question and three possible options. Used as part of a simple choose your own adventure game to help people learn a new language and listen to pronunciation.",
  type: SchemaType.OBJECT,
  properties: {
    scenario: {
      type: SchemaType.STRING,
      description: "The narrative scenario generated by the AI",
    },

    possibleOptions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
      },
      description: "An array of three possible options",
    },
  },
  required: ["scenario", "possibleOptions"], // Ensures all properties are mandatory
};
