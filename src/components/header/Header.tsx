import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/left-arrow.svg?react";
import IconButton from "../ui/buttons/IconButton";

export interface IHeaderProps {
  handleBack?: () => void;
  showBackButton?: boolean;
  title: string;
}

const Header = ({
  handleBack,
  showBackButton = false,
  title,
}: IHeaderProps) => {
  const navigate = useNavigate();

  function onBack() {
    navigate(-1);
    handleBack?.();
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] p-[1rem] flex flex-row gap-[0.5rem] items-end bg-white">
      {showBackButton && (
        <IconButton handleClick={onBack}>
          <BackIcon />
        </IconButton>
      )}
      <p className="text-dark">{title}</p>
    </header>
  );
};

export default Header;
