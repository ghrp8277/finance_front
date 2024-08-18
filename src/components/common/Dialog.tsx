import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-70">
      <div className="relative w-full max-w-lg p-4 bg-gray-900 text-green-500 rounded-md shadow-lg border border-green-500">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 text-green-500 hover:text-green-300"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
