import { useCallback, useEffect, useRef } from 'react';

export const useTimer = () => {
  const timerRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    window.clearTimeout(timerRef.current);
  }, []);

  const setTimer = useCallback((fn: () => void, time = 0) => {
    clearTimer();
    timerRef.current = window.setTimeout(fn, time);
  }, [clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  // return [setTimer, clearTimer];
  return [setTimer, clearTimer] as unknown as [typeof window.setTimeout, typeof window.clearTimeout];
};