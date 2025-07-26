import { createContext, useState, type ReactNode } from "react";
import Toast from "../components/ui/toasts/Toast";

export type ToastType = {
  description?: string;
  delay?: number;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  title: string;
  variant: "success" | "error" | "info" | "warning";
};

type ToastContext = {
  toast: ToastType | null;
  setToast: React.Dispatch<React.SetStateAction<ToastType | null>>;
};

export const ToastContext = createContext<ToastContext | null>(null);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      <div className="m-0 p-0 relative ">
        {children}
        {toast && (
          <Toast
            title={toast.title}
            variant={toast.variant}
            delay={toast.delay}
            description={toast.description}
            position={toast.position}
            closeToast={() => setToast(null)}
          />
        )}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
