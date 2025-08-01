import { forwardRef } from "react";
import IconButton from "../../ui/buttons/IconButton";
import DownloadIcon from "../../../assets/icons/download.svg?react";

interface IProps {
  text: string[];
  filename: string;
}

const TranscribedText = forwardRef(
  ({ text, filename }: IProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    function downloadText() {
      const element = document.createElement("a");
      const file = new Blob([text.join(".")], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${filename}.txt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }

    if (text.length <= 0) return null;

    return (
      <div
        className="w-full rounded-md flex flex-col gap-[0.5rem] items-start bg-light p-[1rem]"
        ref={ref}
      >
        <div className="relative w-full flex flex-row justify-between items-center">
          <p className="text-xl bg-gradient-to-r from-primary via-purple-500 to-dark bg-clip-text text-transparent">
            Transcription
          </p>

          <IconButton
            className="absolute right-0 top-0"
            handleClick={downloadText}
          >
            <DownloadIcon className="w-[20px] h-[20px]" />
          </IconButton>
        </div>

        {text.length > 0 &&
          text.map(
            (text, i) =>
              text.trim() !== "" && (
                <p key={i}>
                  {text}
                  {"."}
                </p>
              )
          )}
      </div>
    );
  }
);

export default TranscribedText;
