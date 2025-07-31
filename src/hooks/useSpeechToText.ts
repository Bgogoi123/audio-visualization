import { useCallback, useState } from "react";

export const useSpeechToText = () => {
  const [loading, setLoading] = useState(false);
  const [transcription, _] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);

  const transcribeAudio = useCallback(async (_: File) => {
    setLoading(true);
    // setError(null);
    setError({message: "Transcription isn't available right now. Revisit after 1-2 days."})
    setLoading(false)

    // try {
    //   const buffer = await file.arrayBuffer();
    //   console.log("api call from hoook...");
    //   const response = await fetch("/.netlify/functions/transcribe", {
    //     method: "POST",
    //     headers: { "Content-Type": file.type },
    //     body: buffer,
    //   });

    //   const result = await response.json();

    //   if (
    //     response.status === 402 ||
    //     response.status === 401 ||
    //     response.status === 403
    //   ) {
    //     setError({
    //       message:
    //         "API Key Expired! Please contact the owner to create a new key.",
    //     });
    //     return;
    //   }

    //   if (result.text) setTranscription(result.text);
    //   else setError({ message: "No text returned." });
    // } catch (err: any) {
    //   setError({ message: err?.message ?? "Unknown error" });
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  return { error, loading, transcription, transcribeAudio };
};

// const transcribeAudio = useCallback(async (file: File) => {
//   setLoading(true);

//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
//           "Content-Type": file.type,
//         },
//         body: file,
//       }
//     );

//     if (response) {
//       if (
//         response.status === 402 ||
//         response.status === 401 ||
//         response.status === 403
//       ) {
//         setError({
//           message:
//             "API Key Expired! Please contact the owner to create a new key.",
//         });
//         return;
//       }

//       const result = await response.json();
//       if (result.text) setTranscription(result.text);
//     } else {
//       setError({ message: response });
//     }
//   } catch (err: any) {
//     if (err?.message) setError({ message: err?.message ?? "" });
//   } finally {
//     setLoading(false);
//   }
// }, []);
