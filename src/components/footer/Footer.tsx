const Footer = () => {
  return (
    <footer className="flex flex-row justify-between items-center bg-primary-100 text-dark px-[2rem] py-[1rem] flex-wrap">
      <p className="text-[14px] text-dark">
        Spectranaut by{" "}
        <a href="https://bg-oncode.netlify.app/" className="hover:text-dark underline">
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
