import { useCallback, useEffect, useState } from "react";

export function useCountdown(initialTime: number = 60) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeRemaining]);

  const reset = useCallback(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  return { timeRemaining, reset };
}
