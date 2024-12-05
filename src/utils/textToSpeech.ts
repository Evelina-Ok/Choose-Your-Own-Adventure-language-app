export const textToSpeech = async (text: string): Promise<void> => {
  if (!import.meta.env.VITE_ELEVEN_LABS_API_KEY)
    throw new Error("ELEVEN_LABS_API_KEY is not defined");

  const body = JSON.stringify({
    text,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": import.meta.env.VITE_ELEVEN_LABS_API_KEY,
    },
    body,
  };

  const voiceId = "9BWtsMINqrJLrRacOk9x";
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/" + voiceId,
      options
    );
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    await audio.play();
  } catch (error) {
    console.error(error);
  }
};
