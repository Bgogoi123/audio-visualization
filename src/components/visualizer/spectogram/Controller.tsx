import PlayIcon from "../../../assets/icons/play.svg?react";
import PauseIcon from "../../../assets/icons/pause.svg?react";
import { type Theme, type ThemeConfig } from "./Spectogram";
import Button from "../../ui/buttons/Button";
import { useState } from "react";

interface IControllerProps {
  fileName?: string;
  isPlaying?: boolean;
  onThemeChange?: (theme: Theme) => void;
  themeList?: ThemeConfig[];
  togglePlay: () => void;
}

const Controller = ({
  fileName,
  isPlaying,
  onThemeChange,
  themeList,
  togglePlay,
}: IControllerProps) => {
  const [openThemeList, setOpenThemeList] = useState(false);

  function handleOpenThemes() {
    setOpenThemeList((prev) => !prev);
  }

  function handleSelectTheme(theme: Theme) {
    setOpenThemeList(false);
    onThemeChange?.(theme);
  }

  return (
    <div className="rounded-md flex flex-row flex-wrap items-center bg-white p-[1rem] justify-between gap-[1rem]">
      <div className="w-1/3 flex flex-row flex-wrap items-center gap-[1rem]">
        <button
          onClick={togglePlay}
          className={`bg-primary rounded-full p-[0.5rem] text-primary-100 hover:text-primary transition-colors duration-500 ${
            fileName ? "hover:bg-primary-100" : "bg-white"
          }  ${fileName ? "cursor-pointer" : "cursor-default"}`}
          disabled={!fileName}
        >
          {!isPlaying ? <PlayIcon /> : <PauseIcon />}
        </button>

        <div className="flex flex-col gap-0">
          <p className="text-[16px] text-dark">Now Playing</p>
          <p className="text-[10px] text-dark">{fileName}</p>
        </div>
      </div>

      <div className="relative">
        <Button handleClick={handleOpenThemes}>Choose your Theme</Button>

        {openThemeList && (
          <div className="w-full absolute top-10 left-0 border-1 border-primary-200 rounded-md bg-white flex flex-col gap-0">
            {themeList && themeList?.length > 0 ? (
              themeList.map((theme, index) => (
                <li
                  key={index}
                  className="text-[16px] text-dark cursor-pointer hover:bg-primary-100 px-[0.7rem] py-[0.5rem] list-none"
                  onClick={() => handleSelectTheme(theme.id)}
                >
                  {theme.name}
                </li>
              ))
            ) : (
              <p className="text-[16px] text-dark px-[0.7rem] py-[0.5rem]">
                No Themes Available
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Controller;
