import { useCallback, useState } from "react";

export const useSpeechToText = () => {
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);

  const transcribeAudio = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const token = import.meta.env.VITE_HUGGING_FACE_TOKEN;
      const buffer = await file.arrayBuffer();

      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": file.type,
          },
          body: buffer,
        }
      );

      const result = await response.json();

      if (
        response.status === 402 ||
        response.status === 401 ||
        response.status === 403
      ) {
        setError({
          message:
            "API Key Expired! Please contact the owner to create a new key.",
        });
        return;
      }

      if (result.text) setTranscription(result.text);
      else setError({ message: "No text returned." });
    } catch (err: any) {
      setError({ message: err?.message ?? "Unknown error" });
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, transcription, transcribeAudio };
};
