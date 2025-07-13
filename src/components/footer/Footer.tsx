export interface IFooterProps {
  variant?: "contained" | "light";
}

const Footer = ({ variant = "contained" }: IFooterProps) => {
  return (
    <footer
      className={`flex flex-row justify-between items-center ${
        variant === "contained" ? "bg-primary-200" : "bg-white"
      }  text-dark px-[2rem] py-[1rem] flex-wrap`}
    >
      <p className="text-[14px] text-dark">
        Spectranaut by{" "}
        <a
          href="https://bg-oncode.netlify.app/"
          className="hover:text-dark underline"
        >
          BG
        </a>
      </p>

      <div className="flex flex-row gap-[1rem] flex-wrap">
        <a
          href="https://github.com/Bgogoi123"
          className="text-[14px] text-dark hover:text-dark"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/bharatigogoi/"
          className="text-[14px] text-dark hover:text-dark"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
