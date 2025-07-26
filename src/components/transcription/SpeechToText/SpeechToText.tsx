import { useEffect } from "react";
import { useSpeechToText } from "../../../hooks/useSpeechToText";
import Button from "../../ui/buttons/Button";

interface ISpeechToTextProps {
  audioFile: File;
  onTranscribe?: (text: string[]) => void;
}

const SpeechToText = ({ audioFile, onTranscribe }: ISpeechToTextProps) => {
  const { loading, transcribeAudio, transcription } = useSpeechToText();

  function handleTranscription(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    onTranscribe?.([]);
    if (audioFile) transcribeAudio(audioFile);
  }

  useEffect(() => {
    if (transcription.trim() !== "") {
      const text = transcription.split(/[!.?]/);
      onTranscribe?.(text);
    }
  }, [transcription]);

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
