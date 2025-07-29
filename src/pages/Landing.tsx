import { useNavigate } from "react-router-dom";
import Button from "../components/ui/buttons/Button";
import SpectrogramImageUrl from "../assets/images/spectrogram.jpg";
import DoneIcon from "../assets/icons/done.svg?react";
import AudioWave from "../assets/lottie/audioWave.json";
import Lottie from "lottie-react";

const RotatingIcon = () => (
  <DoneIcon className="rounded-[50%] text-dark-100 bg-primary-200 hover:bg-dark hover:text-white hover:rotate-45 transition-[rotate] duration-500" />
);

const WhySpectogramContent = ({
  description,
  heading,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="flex flex-row gap-[0.5rem] flex-wrap overflow-auto items-center">
      <RotatingIcon />
      <p className="text-[20px] text-dark font-semibold">{heading}</p>
      <p className="text-[18px] text-dark">{description}</p>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pt-[3rem] gap-0">
      <div className="min-h-[400px] bg-primary-200 flex flex-row flex-wrap justify-between gap-0">
        <div className="flex flex-col gap-[1rem] justify-center items-start px-[2rem]">
          <div className="flex flex-col gap-0">
            <p className="text-[30px] text-dark leading-0">
              Visualize your Audio with
            </p>
            <p className="text-[60px] text-dark font-bold">Spectranaut</p>
            <p className="max-w-[350px] text-[14px] text-dark">
              The Spectogram Visualizer with Custom Themes and Audio Files,{" "}
              <span className="animate-shine bg-gradient-to-r from-purple-500 via-primary to-dark bg-clip-text text-transparent">
                Now with AI-Powered Transcription.
              </span>
            </p>
          </div>

          <Button handleClick={() => navigate("/visualizer")}>
            Get Started
          </Button>
        </div>

        <Lottie
          animationData={AudioWave}
          loop={true}
          style={{ paddingRight: "2rem" }}
        />
      </div>

      <div className="min-h-[150px] flex flex-row justify-between flex-wrap gap-[2rem] overflow-auto py-[4rem] px-[2rem] bg-white">
        <div className="flex flex-col gap-1">
          <p className="text-[34px] font-bold text-dark">
            What is a Spectogram?
          </p>
          <p className="max-w-[600px] text-[18px] text-dark">
            A spectrogram is a visual representation of the frequencies present
            in a sound over time. It displays frequency on the vertical axis,
            time on the horizontal axis, and the intensity (amplitude) of each
            frequency is represented by color or brightness.
          </p>
        </div>

        <img
          src={SpectrogramImageUrl}
          alt="A spectogram"
          className="w-[300px] h-[200px] hover:scale-110 transition-[scale] duration-700"
        />
      </div>

      <div className="min-h-[300px] flex flex-col gap-[1rem] py-[5rem] p-[2rem] bg-white">
        <p className="text-[34px] font-bold text-dark">Why Spectranaut?</p>

        <WhySpectogramContent
          heading="See the Sound -"
          description="Visualize any audio (built-in or uploaded) as a living, breathing spectrogram that evolves in real time."
        />
        <WhySpectogramContent
          heading="Style it Your Way -"
          description="Choose from a spectrum of handcrafted color themes inspired by Nature, Anime, and Science Fiction."
        />
        <WhySpectogramContent
          heading="Spot the Frequencies -"
          description="Instantly identify high-pitched spikes, deep bass hums, and everything in between; all through vibrant color gradients."
        />

        <WhySpectogramContent
          heading="Read the Audio -"
          description="Spectranaut now transcribes spoken audio into readable text; perfect for analyzing lyrics, speech, or dialogue."
        />
        
        <Button
          className="self-start"
          handleClick={() => navigate("/visualizer")}
        >
          Visualize Now
        </Button>
      </div>
    </div>
  );
};
export default Landing;
