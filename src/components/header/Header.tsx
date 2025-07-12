import BackIcon from "../../assets/icons/left-arrow.svg?react";
import IconButton from "../ui/buttons/IconButton";

interface IHeaderProps {
  handleBack?: () => void;
  showBackButton?: boolean;
  title: string;
}

const Header = ({
  handleBack,
  showBackButton = false,
  title,
}: IHeaderProps) => {
  return (
    <div className="p-[1rem] flex flex-row gap-[0.5rem] items-end border-1 border-b-primary-200">
      {showBackButton && (
        <IconButton handleClick={handleBack}>
          <BackIcon />
        </IconButton>
      )}
      <p className="text-primary">{title}</p>
    </div>
  );
};

export default Header;
