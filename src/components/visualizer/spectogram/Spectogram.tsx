import { useEffect, useRef, useState } from "react";
import type { AudioContent } from "../../../pages/AudioVisualizer";
import Controller from "./Controller";

interface ISpectogramProps {
  file?: File | null;
  fileContent?: AudioContent | null;
}

export type Theme =
  | "fire-style"
  | "cool-night"
  | "monochrome"
  | "reverse-heatmap"
  | "heatmap"
  | "bright-daylight"
  | "zoro";

export const SpectogramThemes: {
  id: Theme;
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
}[] = [
  {
    id: "cool-night",
    name: "Cool Night",
    hue: 0,
    lightness: 0,
    saturation: 100,
  },
];

const Spectrogram = ({ file, fileContent }: ISpectogramProps) => {
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSourceNode, setAudioSourceNode] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  const animationFrameRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function analyzeAudioFile({ file, fileContent }: ISpectogramProps) {
    if (file) {
      setFileName(file.name);
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file);
        audioRef.current.load();
      }
    } else if (fileContent) {
      setFileName(fileContent.name ?? "");
      if (audioRef.current) {
        console.log("Audioref src loaded: ", fileContent.url);
        audioRef.current.src = fileContent.url;
        audioRef.current.load();
      }
    } else return;

    if (audioContext) {
      await audioContext.close(); // avoid multiple contexts
    }

    const context = new AudioContext();
    const analyzerNode = context.createAnalyser();
    analyzerNode.fftSize = 256;

    audioSourceNode?.disconnect();

    if (!audioRef.current) return;
    const sourceNode = context.createMediaElementSource(audioRef.current);
    sourceNode.connect(analyzerNode);
    analyzerNode.connect(context.destination);

    setAudioContext(context);
    setAnalyzer(analyzerNode);
    setAudioSourceNode(sourceNode);
  }

  const drawSpectrogram = (analyser: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const width = canvas.width;
    const height = canvas.height;
    // ctx.clearRect(0, 0, width, height);

    const sliceWidth = 1;

    const draw = () => {
      if (!isPlaying) return;

      analyser.getByteFrequencyData(dataArray);

      // Shift the entire canvas one pixel to the left
      const imageData = ctx.getImageData(
        sliceWidth,
        0,
        width - sliceWidth,
        height
      );
      ctx.putImageData(imageData, 0, 0);

      // Draw the new frequency data at the far right
      for (let y = 0; y < bufferLength; y++) {
        const value = dataArray[y];
        const percent = value / 255;
        const barY = (y / bufferLength) * height;
        const barHeight = height / bufferLength;

        // -- cool night theme --
        const hue = 260 + percent * 20; // 260 = indigo, 280 = violet
        const lightness = 20 + percent * 100;
        // ctx.fillStyle = `hsl(${hue}, 100%, ${20 + percent * 40}%)`;

        // -- monochorme theme --
        // const gray = percent * 100;
        // ctx.fillStyle = `hsl(0, 0%, ${gray}%)`; // same for all hues, no color

        // -- fire-style ace theme --
        // const hue = Math.round((1 - percent) * 60); // 60deg = yellow
        // const lightness = 30 + percent * 40;

        // -- bright daylight theme --
        // const hue = percent * 50;
        // const lightness = 60;

        // const baseHue = 260;
        // const hue = baseHue + percent * 20;
        // const lightness = 20 + percent * 40;

        const alpha = percent < 0.02 ? 0 : 1; // make almost-silent bins transparent
        analyser.smoothingTimeConstant = 0.8;

        ctx.fillStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;

        ctx.fillRect(width - sliceWidth, height - barY, sliceWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying((prev) => !prev);
  }

  useEffect(() => {
    if (audioRef.current === null) return;

    function handleAudioEnded() {
      setIsPlaying(false);
    }

    audioRef.current.addEventListener("ended", handleAudioEnded);

    return () => {
      audioRef.current?.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  useEffect(() => {
    if (!file && !fileContent) return;
    analyzeAudioFile({ file: file, fileContent: fileContent });
  }, [file, fileContent]);

  useEffect(() => {
    if (analyzer && isPlaying) drawSpectrogram(analyzer);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [analyzer, isPlaying]);

  useEffect(() => {
    return () => {
      audioContext?.close();
      audioSourceNode?.disconnect();
    };
  }, [audioContext, audioSourceNode]);

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-2">Spectrogram Viewer</h1>
      <audio ref={audioRef} className="hidden" />

      <Controller
        togglePlay={togglePlay}
        fileName={fileName}
        isPlaying={isPlaying}
      />

      <canvas
        ref={canvasRef}
        width="1000"
        height="400"
        className="mt-4 border bg-black"
        onClick={togglePlay}
      />
    </div>
  );
};

export default Spectrogram;
