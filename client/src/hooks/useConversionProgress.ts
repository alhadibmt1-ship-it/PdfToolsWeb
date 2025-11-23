import { useState, useCallback, useRef, useEffect } from "react";

export function useConversionProgress() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setProgress(0);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
  }, []);

  const runWithProgress = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    start();
    try {
      const result = await fn();
      stop();
      return result;
    } catch (error) {
      reset();
      throw error;
    }
  }, [start, stop, reset]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { progress, start, stop, reset, runWithProgress };
}
