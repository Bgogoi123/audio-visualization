import { forwardRef } from "react";

const TranscribedText = forwardRef(
  ({ text }: { text: string[] }, ref: React.ForwardedRef<HTMLDivElement>) => {
    if (text.length <= 0) return null;

    return (
      <div
        className="w-full rounded-md flex flex-col gap-[0.5rem] items-start bg-light p-[1rem]"
        ref={ref}
      >
        <p className="font-bold text-lg text-primary-300">Transcription</p>

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
