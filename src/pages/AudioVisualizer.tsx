import { useEffect, useRef, useState } from "react";
import Spectogram from "../components/visualizer/spectogram/Spectogram";
import SourceController from "../components/audioControllers/SourceController";
import PoliceSiren from "../assets/audio/police-siren-sound-effect-240674.mp3";
import LazyDay from "../assets/audio/lazy-day-stylish-futuristic-chill-239287.mp3";
import CinematicSounds from "../assets/audio/CinematicSoundEffects.mp3";
import LuffyBakaSong from "../assets/audio/LuffyBakaSong.mp3";
import ManHumming from "../assets/audio/ManHumming.mp3";
import PhoneDial from "../assets/audio/PhoneDial.mp3";
import BirdsSong from "../assets/audio/birdsSinging.mp3";
import TranscribedText from "../components/transcription/SpeechToText/TranscribedText";

export type AudioData = { id: number; name: string; url: string };

const AUDIO_URL_DATA: AudioData[] = [
  { id: 1, name: "A Lazy Day", url: LazyDay },
  { id: 2, name: "Birds' Song", url: BirdsSong },
  { id: 3, name: "Cinematic Sound Effects", url: CinematicSounds },
  { id: 4, name: "Luffy Baka Song", url: LuffyBakaSong },
  { id: 5, name: "Man Humming", url: ManHumming },
  { id: 6, name: "Phone Dial", url: PhoneDial },
  { id: 7, name: "Police Siren", url: PoliceSiren },
];

export type AudioContent = { url: string; name: string };

const AudioVisualizer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioContent, setAudioContent] = useState<AudioContent | null>(null);
  const [isSpectanautReset, setIsSpectanautReset] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string[]>([]);

  const transcribeRef = useRef<HTMLDivElement | null>(null);

  function handleChange(changedFile: File) {
    if (changedFile) setAudioFile(changedFile);
  }

  function handleSelectFromDevice() {
    setAudioContent(null);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "device") handleSelectFromDevice();
    else {
      const id = !isNaN(Number(value)) ? Number(value) : 0;
      const content = AUDIO_URL_DATA.find((aud) => aud.id === id);
      if (content) setAudioContent({ name: content?.name, url: content?.url });
    }
  }

  function handleResetSpectogram() {
    setAudioContent(null);
    setAudioFile(null);
    setIsSpectanautReset(true);
    setTranscribedText([]);

    setTimeout(() => {
      setIsSpectanautReset(false);
    }, 300);
  }

  useEffect(() => {
    if (transcribeRef.current && transcribedText.length > 0)
      transcribeRef.current.scrollIntoView({ behavior: "smooth" });
  }, [transcribedText]);

  return (
    <div className="flex flex-col gap-[1rem] items-center py-[5rem] px-[3rem] bg-primary-100">
      <SourceController
        fileOptions={AUDIO_URL_DATA}
        onInputChange={handleChange}
        onReset={handleResetSpectogram}
        onSelectAudio={handleSelect}
        onSelectFromDevice={handleSelectFromDevice}
        onTranscribeAudio={(text) => setTranscribedText(text)}
      />

      <Spectogram
        file={audioFile}
        fileContent={audioContent}
        isReset={isSpectanautReset}
      />

      {transcribedText.length > 0 && (
        <TranscribedText text={transcribedText} ref={transcribeRef} />
      )}
    </div>
  );
};

export default AudioVisualizer;
