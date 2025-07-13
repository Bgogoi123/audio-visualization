import { useRef, useState } from "react";
import Button from "../ui/buttons/Button";
import type { AudioData } from "../../pages/AudioVisualizer";

interface IControllerProps {
  fileOptions?: AudioData[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectAudio?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectFromDevice?: () => void;
  onReset?: () => void;
}

const SourceController = ({
  fileOptions,
  onInputChange,
  onSelectAudio,
  onSelectFromDevice,
  onReset,
}: IControllerProps) => {
  const [isSelectable, setIsSelectable] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "device") {
      if (inputRef.current === null) return;
      inputRef.current.classList.remove("hidden");
      onSelectFromDevice?.();
      setIsSelectable(false);
    } else onSelectAudio?.(e);
  }

  function handleReset() {
    if (inputRef.current) inputRef.current.classList.add("hidden");
    setIsSelectable(true);
    onReset?.();
  }

  return (
    <div className="min-h-[70px] w-full rounded-md flex flex-row flex-wrap items-center gap-[1rem] bg-light p-[1rem]">
      <select
        onChange={handleSelect}
        disabled={!isSelectable}
        className={`min-w-1/3 border-1 border-[#ccc] rounded-md p-2 bg-primary-100 ${
          isSelectable
            ? "cursor-pointer hover:bg-primary-200"
            : "cursor-default"
        }`}
      >
        <option selected disabled>
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
        onChange={onInputChange}
        className="min-w-1/3 hidden border-1 border-[#ccc] rounded-md p-2 cursor-pointer hover:bg-blue-200"
      />

      <Button variant="outlined" handleClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default SourceController;
