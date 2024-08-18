import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // 지속 시간 (ms), 기본값은 3000ms
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center w-full max-w-sm p-4 rounded shadow-lg z-50 transition-transform transform ${
        isVisible ? "animate-bounceIn" : "animate-fadeOut"
      } ${typeStyles[type]}`}
    >
      <div className="flex-1">
        <p className="text-xs">{message}</p>
      </div>
      <button onClick={() => setIsVisible(false)} className="ml-4 text-white">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
