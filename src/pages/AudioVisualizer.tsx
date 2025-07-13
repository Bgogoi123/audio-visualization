import { useState } from "react";
import Spectogram from "../components/visualizer/spectogram/Spectogram";
import SourceController from "../components/audioControllers/SourceController";
import SFXDripsUrl from "../assets/audio/sfx-drips-from-ice-melt-in-a-glacial-cave-368277.mp3";
import PoliceSiren from "../assets/audio/police-siren-sound-effect-240674.mp3";
import Flute from "../assets/audio/krishna-flute-2669.mp3";
import BirdsAndNature from "../assets/audio/rainy-day-in-town-with-birds-singing-194011.mp3";
import AnthemOfVictory from "../assets/audio/anthem-of-victory-111206.mp3";
import LazyDay from "../assets/audio/lazy-day-stylish-futuristic-chill-239287.mp3";

export type AudioData = { id: number; name: string; url: string };

const AUDIO_URL: AudioData[] = [
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList === null || fileList.length <= 0) return;

    const file = fileList[0];
    setAudioFile(file);
  }

  function handleSelectFromDevice() {
    setAudioContent(null);
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
    <div className="flex flex-col gap-0">
      <div className="h-[100vh] flex flex-col gap-[1rem] items-center py-[1rem] px-[3rem] bg-primary-100">
        <SourceController
          fileOptions={AUDIO_URL}
          onInputChange={handleChange}
          onSelectAudio={handleSelect}
          onSelectFromDevice={handleSelectFromDevice}
          onReset={handleResetSpectogram}
        />

        <Spectogram file={audioFile} fileContent={audioContent} />
      </div>
    </div>
  );
};

export default AudioVisualizer;
