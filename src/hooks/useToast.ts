import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error("Error! 'useToast' must be within a ToastContextProvider!");

  return context;
};
