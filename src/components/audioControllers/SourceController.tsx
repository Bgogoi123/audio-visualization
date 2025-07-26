import { useRef, useState } from "react";
import Button from "../ui/buttons/Button";
import type { AudioData } from "../../pages/AudioVisualizer";
import SpeechToText from "../transcription/SpeechToText/SpeechToText";
import { convertUrlToFile, isSupportedAudioType } from "../../utils/utils";

interface IControllerProps {
  fileOptions?: AudioData[];
  onInputChange?: (file: File) => void;
  onReset?: () => void;
  onSelectAudio?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectFromDevice?: () => void;
  onTranscribeAudio?: (text: string[]) => void;
}

const SourceController = ({
  fileOptions,
  onInputChange,
  onReset,
  onSelectAudio,
  onSelectFromDevice,
  onTranscribeAudio,
}: IControllerProps) => {
  const [isSelectable, setIsSelectable] = useState(true);
  const [selectValue, setSelectValue] = useState(-1);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "device") {
      if (inputRef.current === null) return;
      inputRef.current.classList.remove("hidden");
      onSelectFromDevice?.();
      setIsSelectable(false);
      setSelectValue(-1);
    } else {
      if (!isNaN(Number(value))) {
        setSelectValue(Number(value));
        onSelectAudio?.(e);

        const selectedOption = fileOptions?.find(
          (op) => op.id === Number(value)
        );
        if (selectedOption) {
          const convertedFile = await convertUrlToFile(
            selectedOption.url,
            selectedOption.name
          );
          if (convertedFile instanceof File) setAudioFile(convertedFile);
        }
      }
    }
  }

  function handleReset() {
    if (inputRef.current) inputRef.current.classList.add("hidden");
    setIsSelectable(true);
    setSelectValue(-1);
    setAudioFile(null);
    onReset?.();
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList === null || fileList.length <= 0) return;

    const file = fileList[0];

    if (file && isSupportedAudioType(file.type)) {
      setAudioFile(file);
      onInputChange?.(file);
    } else console.warn("Select a valid Audio file!");
  }

  function handleTranscriptedText(text: string[]) {
    onTranscribeAudio?.(text);
  }

  return (
    <div className="min-h-[70px] w-full rounded-md flex flex-row flex-wrap overflow-auto items-center gap-[1rem] bg-light p-[1rem]">
      <select
        value={selectValue}
        onChange={handleSelect}
        disabled={!isSelectable}
        className={`min-w-1/3 border-1 border-[#ccc] rounded-md p-2 bg-primary-100 ${
          isSelectable
            ? "cursor-pointer hover:bg-primary-200"
            : "cursor-default"
        }`}
      >
        <option value={-1} disabled>
          Select an audio
        </option>
        {fileOptions?.map((url, i) => (
          <option key={i} value={url.id}>
            {url.name}
          </option>
        ))}
        <option value={"device"}>Select from device</option>
      </select>

      <input
        type="file"
        ref={inputRef}
        accept="audio/*"
        onChange={handleFileInputChange}
        className="min-w-1/3 hidden border-1 border-[#ccc] rounded-md p-2 cursor-pointer hover:bg-blue-200"
      />

      {audioFile && (
        <SpeechToText
          audioFile={audioFile}
          onTranscribe={handleTranscriptedText}
        />
      )}

      <Button variant="outlined" handleClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default SourceController;
