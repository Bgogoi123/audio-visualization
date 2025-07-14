import GitHubIcon from "../../assets/icons/github.svg?react";
import LinkedInIcon from "../../assets/icons/linkedin.svg?react";

export interface IFooterProps {
  variant?: "contained" | "light";
}

const Footer = ({ variant = "contained" }: IFooterProps) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 h-[50px] w-full flex flex-row flex-wrap justify-between items-center text-dark px-[2rem] py-[1rem] 
        ${variant === "contained" ? "bg-primary-200" : "bg-white"}`}
    >
      <p className="text-[14px] text-dark">
        Spectranaut by{" "}
        <a
          href="https://bg-oncode.netlify.app/"
          className="hover:text-primary-300 underline"
        >
          BG
        </a>
      </p>

      <div className="flex flex-row gap-[1rem] flex-wrap">
        <a
          href="https://github.com/Bgogoi123"
          className="text-[14px] text-dark hover:text-primary-300 decoration-0"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/bharatigogoi/"
          className="text-[14px] text-dark hover:text-primary-300"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
