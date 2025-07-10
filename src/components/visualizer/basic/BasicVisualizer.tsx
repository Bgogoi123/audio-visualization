import { useEffect, useRef, useState } from "react";
import PlayIcon from "../../assets/icons/play.svg?react";
import PauseIcon from "../../assets/icons/pause.svg?react";

interface IProps {
  file: File | null;
  isDownloaded?: boolean;
  isUploaded?: boolean;
  loading?: boolean;
  onDownload?: () => void;
  onUpload?: () => void;
  variant?: "primary" | "secondary";
}

const BasicVisualizer = ({
  file,
  isDownloaded = true,
  isUploaded = true,
  loading,
  variant = "primary",
}: IProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveFormData, setWaveFormData] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryClasses = "bg-primary-500 text-textcolor-white";
  const secondaryClasses = "bg-background-04 text-textcolor-secondary";

  function togglePlay(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (audioRef.current === null) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying((prev) => !prev);
  }

  async function generateWaveFormData(file: File) {
    setIsAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer (raw binary data)
      const audioContext = new window.AudioContext(); // Create Web Audio Context (audio processing environment)
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer); // Decode audio file into PCM  (Pulse Code Modulation) data that we can analyze

      const channelData = audioBuffer.getChannelData(0); // Gets the first audio channel (left channel for stereo, or mono)
      const samples = 60; // number of bars in waveform
      const blockSize = Math.floor(channelData.length / samples); //  How many audio samples to group together for each bar
      const waveform: number[] = [];

      // console.log("channelData: ", channelData);
      // console.log("block size: ", blockSize);

      // Divide the audio into 60 blocks (one for each waveform bar)
      for (let i = 0; i < samples; i++) {
        const start = i * blockSize;
        const end = start + blockSize;
        let sum = 0;

        // console.log({ start, end });

        // Calculate the average amplitude; This gives us the "energy" or "loudness" of each section
        for (let j = start; j < end; j++) {
          sum += Math.abs(channelData[j]);
          // console.log("adding to sum: ", Math.abs(channelData[j]));
        }

        const average = sum / blockSize;
        waveform.push(average);

        // console.log({ average });
      }

      // Normalize the waveform data (scale to 0-1 range)
      const maxValue = Math.max(...waveform); // Find the highest amplitude value in the waveform.
      const normalizedWaveForm = waveform.map((val) => val / maxValue); // Divide all values by the maximum

      setWaveFormData(normalizedWaveForm);
      audioContext.close();
    } catch (error) {
      console.error("Error generating waveform : ", error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleCanvasClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!audioRef.current || duration === 0 || !isDownloaded || !isUploaded)
      return;

    const canvas = canvasRef.current;
    if (canvas === null) return;

    const { left, width } = canvas.getBoundingClientRect();

    const clickX = e.clientX - left + 1;
    const progress = clickX / width;
    const newTime = progress * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function drawWaveForm() {
    if (canvasRef.current === null || waveFormData.length === 0) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    if (canvasCtx === null) return;

    const { width, height } = canvas;
    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = width / waveFormData.length;
    const progress = duration > 0 ? currentTime / duration : 0;

    waveFormData.forEach((val, i) => {
      const barHeight = Math.max(2, val * height * 0.8);
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      const isPlayed = i / waveFormData.length < progress;

      const unPlayedColor = "#e7f5ff";
      const playedColor = "#1971c2";

      canvasCtx.fillStyle = isPlayed ? playedColor : unPlayedColor;
      canvasCtx.beginPath();
      canvasCtx.roundRect(x, y, barWidth - 1, barHeight, 50);
      canvasCtx.fill();
    });
  }

  function handleAudioEvent() {
    const audio = audioRef.current;
    if (audio === null) return;

    function handleLoadMetaData() {
      setDuration(audio?.duration ?? 0);
    }

    function handleTimeUpdate() {
      setCurrentTime(audio?.currentTime ?? 0);
    }

    function handleEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
    }

    audio.addEventListener("loadedmetadata", handleLoadMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.addEventListener("loadedmetadata", handleLoadMetaData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
    };
  }

  async function generateFileUrl() {
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (audioRef.current) audioRef.current.src = url;
    await generateWaveFormData(file);
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // function handleDownloadAudio(
  //   _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) {
  //   onDownload?.();
  // }

  // function handleUploadAudio(
  //   _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) {
  //   onUpload?.();
  // }

  useEffect(() => {
    generateFileUrl();
  }, [file]);

  useEffect(() => {
    drawWaveForm();
  }, [waveFormData, currentTime, duration]);

  useEffect(() => {
    handleAudioEvent();
  }, [file]);

  if (file === null)
    return (
      <div
        className={`flex flex-col gap-[2px] rounded-xl ${
          variant === "primary" ? primaryClasses : secondaryClasses
        } p-[12px] w-[240px]`}
      >
        <p className="m-0 p-0 text-caption-2 text-left">Couldn't load audio!</p>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-[0.5rem] items-center justify-center">
      <audio ref={audioRef} className="hidden" />

      <div
        className={`border-1 border-gray-200 flex flex-col gap-[2px] rounded-xl px-3.5 py-1.5 ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        <div className="flex flex-row items-center justify-between gap-[12px]">
          {isAnalyzing || loading ? (
            <p className="m-0 p-0 text-caption-2 text-center">
              Analyzing Audio...
            </p>
          ) : isPlaying ? (
            <button onClick={togglePlay}>
              <PauseIcon className="w-[32px] h-[32px]" />
            </button>
          ) : (
            <button onClick={togglePlay}>
              <PlayIcon className="w-[32px] h-[32px]" />
            </button>
          )}

          <div className="flex flex-col gap-[2px]">
            <canvas
              ref={canvasRef}
              className={`${
                isDownloaded ? "cursor-pointer" : ""
              } h-10 bg-transparent min-w-[150px]`}
              onClick={handleCanvasClick}
            />

            <p className="text-[10px] self-end">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicVisualizer;
