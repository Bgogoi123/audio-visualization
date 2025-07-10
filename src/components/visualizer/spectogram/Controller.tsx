import PlayIcon from "../../../assets/icons/play.svg?react";
import PauseIcon from "../../../assets/icons/pause.svg?react";
import { SPECTOGRAM_THEMES, type Theme } from "./Spectogram";

interface IControllerProps {
  fileName?: string;
  isPlaying?: boolean;
  onThemeChange?: (theme: Theme) => void;
  togglePlay: () => void;
}

const Controller = ({
  fileName,
  isPlaying,
  onThemeChange,
  togglePlay,
}: IControllerProps) => {
  return (
    <div className="flex flex-row items-center gap-[1rem]">
      <div className="border-1 border-gray-300 rounded-md flex flex-row gap-[1rem] items-center self-start px-4 py-2">
        <button
          onClick={togglePlay}
          className={`border-1 border-gray-300 rounded-md px-[10px] py-[8px] ${fileName ? "hover:bg-gray-300" : "bg-white" }  ${
            fileName ? "cursor-pointer" : "cursor-default"
          }`}
          disabled={!fileName}
        >
          {!isPlaying ? <PlayIcon /> : <PauseIcon />}
        </button>
        <p>{fileName ? `Playing ${fileName}` : "Select an Audio to Visualize"}</p>
      </div>

      <select
        className="border-1 border-[#ccc] rounded-md p-[1rem] cursor-pointer hover:bg-blue-200"
        onChange={(e) => {
          onThemeChange?.(e.target.value as Theme);
        }}
      >
        <option selected disabled>
          Select a Theme
        </option>
        {SPECTOGRAM_THEMES.map((theme, i) => (
          <option key={i} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Controller;
