import { useEffect, useState } from "react";
import { textToSpeech } from "../utils/textToSpeech";

export const useAudio = (text: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const getAudio = async () => {
    try {
      const newAudio = await textToSpeech(text);
      console.log("Got audio", newAudio);
      setAudio(newAudio);
    } catch (e) {
      console.error("Error getting audio", e);
    }
  };
  useEffect(() => {
    getAudio();
  }, [text]);

  return { audio };
};
