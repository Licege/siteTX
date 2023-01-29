import { useCallback, useEffect, useRef } from 'react';

export const useTimer = () => {
  const timerRef = useRef<number>(0);

  const setTimer = useCallback((fn: () => void, time = 0) => {
    timerRef.current = window.setTimeout(fn, time);
  }, []);

  const clearTimer = useCallback(() => {
    window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  // return [setTimer, clearTimer];
  return [setTimer, clearTimer] as unknown as [typeof window.setTimeout, typeof window.clearTimeout];
};