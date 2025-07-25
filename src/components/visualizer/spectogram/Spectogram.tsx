import { useEffect, useRef, useState } from "react";
import type { AudioContent } from "../../../pages/AudioVisualizer";
import Controller from "./Controller";

interface ISpectogramProps {
  file?: File | null;
  fileContent?: AudioContent | null;
  isReset?: boolean;
}

export type Theme =
  | "cool-night"
  | "cosmic-void"
  | "heatmap"
  | "monochrome"
  | "nezuko"
  | "zoro";

export type ThemeConfig = {
  id: Theme;
  name: string;
  calc: (percent: number) => {
    hue: number;
    saturation: number;
    lightness: number;
  };
};

export const SPECTOGRAM_THEMES: ThemeConfig[] = [
  {
    id: "cool-night",
    name: "Cool Night",
    calc: (percent: number) => ({
      hue: 260 + percent * 0,
      saturation: 100,
      lightness: 20 + percent * 50,
    }),
  },
  {
    id: "cosmic-void",
    name: "Cosmic Void",
    calc: (percent: number) => {
      const hue = 240 - percent * 240;
      const saturation = 100;
      const lightness = 5 + percent * 60;
      return { hue, saturation, lightness };
    },
  },
  {
    id: "heatmap",
    name: "Heat Map",
    calc: (percent: number) => ({
      hue: Math.round((1 - percent) * 240),
      saturation: 100,
      lightness: 50,
    }),
  },
  {
    id: "monochrome",
    name: "Monochrome",
    calc: (percent: number) => ({
      hue: percent * 20,
      saturation: 0,
      lightness: percent * 100,
    }),
  },
  {
    id: "nezuko",
    name: "Nezuko's Fire",
    calc: (percent: number) => ({
      hue: 260 + percent * 120,
      saturation: 100,
      lightness: 20 + percent * 50,
    }),
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    calc: (percent: number) => {
      const hue = 120 - percent * 40;
      const saturation = 100;
      const lightness = 10 + percent * 40;
      return { hue, saturation, lightness };
    },
  },
];

const Spectrogram = ({
  file,
  fileContent,
  isReset = false,
}: ISpectogramProps) => {
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSourceNode, setAudioSourceNode] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [internalAudioRef, setInternalAudioRef] =
    useState<HTMLAudioElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState<Theme>("heatmap");

  const animationFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function analyzeAudioFile({ file, fileContent }: ISpectogramProps) {
    const audioElem = new Audio();
    audioElem.src = file ? URL.createObjectURL(file) : fileContent?.url ?? "";
    audioElem.load();
    setInternalAudioRef(audioElem);
    setFileName(file ? file.name : fileContent?.name ?? "Audio File");
    setIsPlaying(false);

    if (audioContext) {
      await audioContext.close(); // avoid multiple contexts
    }

    const context = new AudioContext();
    const analyzerNode = context.createAnalyser();
    analyzerNode.fftSize = 256;

    audioSourceNode?.disconnect();

    const sourceNode = context.createMediaElementSource(audioElem);
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
        const alpha = percent < 0.02 ? 0 : 1; // make almost-silent bins transparent

        // theme - selection
        const selectedTheme = SPECTOGRAM_THEMES.find((th) => th.id === theme);
        if (selectedTheme !== undefined) {
          const { hue, saturation, lightness } = selectedTheme.calc(percent);
          // use these values in hsla:
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        } else {
          // use a default theme (say heatmap).
          const hue = Math.round((1 - percent) * 240);
          ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
        }
        ctx.fillRect(width - sliceWidth, height - barY, sliceWidth, barHeight);
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  function togglePlay() {
    if (isPlaying) internalAudioRef?.pause();
    else internalAudioRef?.play();
    setIsPlaying((prev) => !prev);
  }

  function resetVisualizer() {
    try {
      // Stop playback
      internalAudioRef?.pause();
      internalAudioRef?.removeAttribute("src");
      internalAudioRef?.load();

      // Disconnect audio nodes
      if (audioSourceNode) audioSourceNode?.disconnect();
      if (audioContext) audioContext?.close();

      // Cancel animation
      cancelAnimationFrame(animationFrameRef.current);

      // Clear canvas
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset state
      setAnalyzer(null);
      setAudioContext(null);
      setAudioSourceNode(null);
      setInternalAudioRef(null);
      setFileName("");
      setIsPlaying(false);
      setTheme("heatmap");
    } catch (err) {
      console.error("Error while reseting spectogram: ", err);
    }
  }

  useEffect(() => {
    const handleAudioEnded = () => setIsPlaying(false);
    internalAudioRef?.addEventListener("ended", handleAudioEnded);
    return () => {
      internalAudioRef?.removeEventListener("ended", handleAudioEnded);
    };
  }, [internalAudioRef]);

  useEffect(() => {
    if (!file && !fileContent) return;
    analyzeAudioFile({ file: file, fileContent: fileContent });
  }, [file, fileContent]);

  useEffect(() => {
    if (analyzer && isPlaying) drawSpectrogram(analyzer);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [analyzer, isPlaying, theme]);

  useEffect(() => {
    return () => {
      if (audioContext) audioContext?.close();
      if (audioSourceNode) audioSourceNode?.disconnect();
    };
  }, [audioContext, audioSourceNode]);

  useEffect(() => {
    resetVisualizer();
  }, [isReset]);

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      {(file || fileContent) && (
        <Controller
          togglePlay={togglePlay}
          fileName={fileName}
          isPlaying={isPlaying}
          onThemeChange={(value) => setTheme(value)}
          themeList={SPECTOGRAM_THEMES}
        />
      )}

      <canvas
        ref={canvasRef}
        width="1000"
        className="h-[400px] bg-canvas rounded-md border"
        onClick={togglePlay}
      />
    </div>
  );
};

export default Spectrogram;
