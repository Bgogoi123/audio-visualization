import { useEffect } from "react";
import { useSpeechToText } from "../../../hooks/useSpeechToText";
import Button from "../../ui/buttons/Button";
import { useToast } from "../../../hooks/useToast";

interface ISpeechToTextProps {
  audioFile: File;
  onTranscribe?: (text: string[]) => void;
}

const SpeechToText = ({ audioFile, onTranscribe }: ISpeechToTextProps) => {
  const { error, loading, transcribeAudio, transcription } = useSpeechToText();
  const { setToast } = useToast();

  function handleTranscription(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    onTranscribe?.([]);
    if (audioFile) transcribeAudio(audioFile);
  }

  useEffect(() => {
    if (error) {
      setToast({
        title: "Failed to Tanscribe!",
        description: error.message,
        variant: "error",
        delay: 5000
      });
    }

    if (transcription.trim() !== "") {
      const text = transcription.split(/[!.?]/);
      onTranscribe?.(text);
    }
  }, [error, transcription]);

  return (
    <Button
      variant="contained"
      handleClick={handleTranscription}
      loading={loading}
    >
      Transcribe
    </Button>
  );
};

export default SpeechToText;
