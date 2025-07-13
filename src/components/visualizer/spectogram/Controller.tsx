import PlayIcon from "../../../assets/icons/play.svg?react";
import PauseIcon from "../../../assets/icons/pause.svg?react";
import { SPECTOGRAM_THEMES, type Theme, type ThemeConfig } from "./Spectogram";
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
  const [spectoTheme, setSpectoTheme] = useState<string | null>(null);

  function handleOpenThemes() {
    setOpenThemeList((prev) => !prev);
  }

  function handleSelectTheme(theme: Theme) {
    const themeDetails = SPECTOGRAM_THEMES.find((th) => th.id === theme);
    if (themeDetails) setSpectoTheme(themeDetails.name);

    setOpenThemeList(false);
    onThemeChange?.(theme);
  }

  return (
    <div className="rounded-md flex flex-row flex-wrap items-center bg-white p-[1rem] justify-between gap-[1rem]">
      <div className="w-1/3 flex flex-row flex-wrap items-center gap-[1rem]">
        <button
          onClick={togglePlay}
          className={`bg-primary rounded-full border-1 border-primary p-[0.5rem] text-primary-100 hover:text-primary transition-colors duration-200 ${
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
        <Button handleClick={handleOpenThemes} className="min-w-[160px]">
          {spectoTheme ? spectoTheme : "Choose your Theme"}
        </Button>

        {openThemeList && (
          <>
            <div
              className="fixed inset-0 z-10 backdrop-blur-xs"
              onClick={() => setOpenThemeList(false)}
            />

            <div className="absolute z-20 top-12 left-0 w-max border border-primary-200 rounded-md bg-white shadow-md">
              <li className="text-[16px] text-dark cursor-default bg-primary-200 px-[0.7rem] py-[0.5rem] list-none">
                Choose your Theme
              </li>
              {themeList && themeList.length > 0 ? (
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
          </>
        )}
      </div>
    </div>
  );
};

export default Controller;
