import { useEffect, useMemo } from "react";
import type { ToastType } from "../../../context/ToastContext";

interface IToastProps extends ToastType {
  closeToast?: () => void;
}

const Toast = ({
  title,
  variant,
  delay = 3000,
  description,
  position = "top-right",
  closeToast,
}: IToastProps) => {
  const positionBasedClass = useMemo(() => {
    switch (position) {
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-right":
        return "bottom-0 right-0";
      case "top-left":
        return "top-10 left-0";
      case "top-right":
        return "top-2 right-1";
      default:
        return "top-0 right-0";
    }
  }, [position]);

  const variantBasedClass = useMemo(() => {
    switch (variant) {
      case "error":
        return "bg-red-300 text-red-950";
      case "info":
        return "bg-blue-300 text-blue-950";
      case "success":
        return "bg-[#7ed695] text-[#0e3318]";
      case "warning":
        return "bg-[#f5c767] text-[#453106";
      default:
        return "bg-blue-300 text-blue-950";
    }
  }, [variant]);

  useEffect(() => {
    setTimeout(() => {
      closeToast?.();
    }, delay);
  }, [delay]);

  return (
    <div
      className={`fixed z-[1000] rounded-md shadow-sm min-w-[200px] max-w-[300px] 
      ${positionBasedClass} ${variantBasedClass} 
      px-[14px] py-[12px] flex flex-col items-start gap-[8px]`}
    >
      <h4 className="text-lg leading-5">{title}</h4>
      {description && <p className="text-sm leading-5">{description}</p>}
    </div>
  );
};

export default Toast;
