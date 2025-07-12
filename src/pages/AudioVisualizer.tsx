import { useRef, useState } from "react";
import Spectogram from "../components/visualizer/spectogram/Spectogram";

import SFXDripsUrl from "../assets/audio/sfx-drips-from-ice-melt-in-a-glacial-cave-368277.mp3";
import PoliceSiren from "../assets/audio/police-siren-sound-effect-240674.mp3";
import Flute from "../assets/audio/krishna-flute-2669.mp3";
import BirdsAndNature from "../assets/audio/rainy-day-in-town-with-birds-singing-194011.mp3";
import AnthemOfVictory from "../assets/audio/anthem-of-victory-111206.mp3";
import LazyDay from "../assets/audio/lazy-day-stylish-futuristic-chill-239287.mp3";

const AUDIO_URL: { id: number; name: string; url: string }[] = [
  { id: 1, name: "A Lazy Day", url: LazyDay },
  { id: 2, name: "Anthem of Victory", url: AnthemOfVictory },
  { id: 3, name: "Birds and Nature", url: BirdsAndNature },
  { id: 4, name: "Drips from Melting Ice in a Glacial Cave", url: SFXDripsUrl },
  { id: 5, name: "Flute", url: Flute },
  { id: 6, name: "Police Siren", url: PoliceSiren },
];

export type AudioContent = { url: string; name: string };

const AudioVisualizer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioContent, setAudioContent] = useState<AudioContent | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList === null || fileList.length <= 0) return;

    const file = fileList[0];
    setAudioFile(file);
  }

  function handleSelectFromDevice() {
    setAudioContent(null);
    if (inputRef.current === null) return;
    inputRef.current.classList.remove("hidden");
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "device") handleSelectFromDevice();
    else {
      const id = !isNaN(Number(value)) ? Number(value) : 0;
      const content = AUDIO_URL.find((aud) => aud.id === id);
      if (content) setAudioContent({ name: content?.name, url: content?.url });
    }
  }

  function handleResetSpectogram() {
    setAudioContent(null);
    setAudioFile(null);
  }

  return (
    <div className="h-[100vh] flex flex-col gap-[2rem] p-6 items-start">
      <div className="flex flex-row gap-1 items-center">
        <select
          onChange={handleSelect}
          className="border-1 border-[#ccc] rounded-xl p-2 cursor-pointer hover:bg-blue-200"
        >
          <option selected disabled>
            Select an audio
          </option>
          {AUDIO_URL.map((url, i) => (
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
          onChange={handleChange}
          className="hidden border-1 border-[#ccc] rounded-xl p-2 cursor-pointer hover:bg-blue-200"
        />

        <button
          className="border-1 border-[#ccc] rounded-md p-[0.5rem] cursor-pointer hover:bg-blue-200"
          onClick={handleResetSpectogram}
        >
          Reset
        </button>
      </div>

      <Spectogram file={audioFile} fileContent={audioContent} />
    </div>
  );
};

export default AudioVisualizer;
