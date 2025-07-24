import { useEffect, useState } from "react";
import { useSpeechToText } from "../../../hooks/useSpeechToText";
import Button from "../../ui/buttons/Button";

const SpeechToText = ({ audioFile }: { audioFile: File }) => {
  const [transcriptionText, setTranscriptionText] = useState<string[]>([]);
  const { loading, transcribeAudio, transcription } = useSpeechToText();

  useEffect(() => {
    if (transcription.trim() !== "")
      setTranscriptionText(transcription.split(/[!.?]/));
  }, [transcription]);

  return (
    <div className="rounded-md flex flex-col gap-[0.5rem] items-start bg-light p-[1rem]">
      <Button
        variant="contained"
        handleClick={() => transcribeAudio(audioFile)}
        loading={loading}
      >
        Transcribe
      </Button>

      <div className="rounded-md p-[8px] flex flex-col gap-[8px]">
        {transcriptionText.length > 0 &&
          transcriptionText.map(
            (text, i) =>
              text.trim() !== "" && (
                <p key={i}>
                  {text}
                  {"."}
                </p>
              )
          )}
      </div>
    </div>
  );
};

export default SpeechToText;
