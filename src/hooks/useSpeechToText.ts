import { useCallback, useState } from "react";

export const useSpeechToText = () => {
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const transcribeAudio = useCallback(async (file: File) => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
            "Content-Type": file.type,
          },
          body: file,
        }
      );

      if (response) {
        const result = await response.json();

        if (result.text) setTranscription(result.text);
      }
    } catch (err) {
      console.warn("error ---->", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, transcription, transcribeAudio };
};
