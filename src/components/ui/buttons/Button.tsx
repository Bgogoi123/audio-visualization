import type { ReactNode } from "react";

interface IButtonProps {
  label: ReactNode;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "contained" | "outlined";
}

const Button = ({
  label,
  className,
  handleClick,
  variant = "contained",
}: IButtonProps) => {
  const variantClasses =
    variant === "contained"
      ? "border-none bg-primary-300 hover:bg-dark text-light"
      : "border-1 border-primary-300 text-dark hover:bg-primary-300 hover:text-light";

  return (
    <button
      className={`${className} ${variantClasses} rounded-md py-[8px] px-[14px] cursor-pointer text-[14px] transition-colors duration-700`}
      onClick={handleClick}
    >
      <p>{label}</p>
    </button>
  );
};

export default Button;
