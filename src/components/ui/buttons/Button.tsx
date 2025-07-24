import { type ReactNode } from "react";
import LoaderIcon from "../../../assets/icons/loader.svg?react";

interface IButtonProps {
  children: ReactNode;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  variant?: "contained" | "outlined";
}

const Button = ({
  children,
  className,
  handleClick,
  loading = false,
  variant = "contained",
}: IButtonProps) => {
  const variantClasses =
    variant === "contained"
      ? "border-none bg-primary-300 hover:bg-dark text-light"
      : "border-1 border-primary-300 text-dark hover:bg-primary-300 hover:text-light";

  return (
    <button
      className={`${className} ${variantClasses} rounded-md py-[8px] px-[14px] cursor-pointer text-[14px] transition-colors duration-500`}
      onClick={handleClick}
    >
      <div className="flex flex-row gap-[8px] items-center">
        {children}
        {loading && <LoaderIcon className="animate-spin w-[15px] h-[15px]" />}
      </div>
    </button>
  );
};

export default Button;
