import { useState, useEffect } from "react";

type CountDownProps = {
  initialTime: string;
  color?: string;
  className?: string;
  hide?: boolean;
  onComplete?: () => void;
};

const CountDown: React.FC<CountDownProps> = ({
  initialTime,
  color = "black",
  className,
  hide = false,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const [minutes, seconds] = initialTime.split(":").map(Number);
    return minutes * 60 + seconds;
  });

  useEffect(() => {
    if (hide || timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete, hide]);

  useEffect(() => {
    if (timeLeft <= 0 && onComplete) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (hide) return null;

  return (
    <div className={className} style={{ color }}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountDown;
