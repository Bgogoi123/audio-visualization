import type { JSX } from "react";

interface IconButtonProps {
  children: JSX.Element;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const IconButton = ({ children, handleClick }: IconButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer rounded-xs text-primary hover:text-dark hover:bg-light w-[25px] h-[25px]"
    >
      {children}
    </button>
  );
};

export default IconButton;
