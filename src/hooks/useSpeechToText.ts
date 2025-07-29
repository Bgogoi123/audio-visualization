import { useCallback, useState } from "react";

export const useSpeechToText = () => {
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);

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

      console.log({ response });

      if (response) {
        if (response.status === 402) {
          setError({
            message:
              "API Key Expired! Please contact the owner to create a new key.",
          });
          return;
        }

        const result = await response.json();
        if (result.text) setTranscription(result.text);
      } else {
        setError({ message: response });
      }
    } catch (err: any) {
      if (err?.message) setError({ message: err?.message ?? "" });
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, transcription, transcribeAudio };
};
