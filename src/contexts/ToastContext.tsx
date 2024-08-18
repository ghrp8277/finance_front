import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/common/Toast";

interface ToastContextProps {
  showToast: (
    message: string,
    type?: "success" | "error" | "info" | "warning",
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [toastDuration, setToastDuration] = useState<number>(3000);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
    duration: number = 3000
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastDuration(duration);
  };

  const handleToastClose = () => {
    setToastMessage(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={toastDuration}
          onClose={handleToastClose}
        />
      )}
    </ToastContext.Provider>
  );
};
