import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-neon-green">
      <img
        src="/razer-logo.svg"
        alt="Razer logo"
        className="w-24 h-24 animate-spin"
      />
      <div className="font-bold mt-5 text-lg tracking-widest uppercase animate-pulse">
        Loading
      </div>
    </div>
  );
};

export default LoadingSpinner;
