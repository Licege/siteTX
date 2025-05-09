import { useEffect, useState } from 'react';
import { useTimer } from './useTimer';

const ERROR_DELTA_MS = 15;

export const useAnimation = (
  duration: number,
  shown: boolean,
  delay = 0
): [boolean, boolean, boolean] => {
  const [exists, setExists] = useState<boolean>(shown);
  const [visible, setVisible] = useState<boolean>(shown);
  const [finished, setFinished] = useState<boolean>(visible);
  const [setTimer, clearTimer] = useTimer();

  useEffect(() => {
    setFinished(false);

    if (shown) {
      setExists(true);

      setTimer(() => {
        setVisible(true);

        setTimer(() => {
          setFinished(true);
        }, duration);
      }, delay + ERROR_DELTA_MS);
    } else {
      setVisible(false);

      setTimer(() => {
        setExists(false);
        setFinished(true);
      }, duration + ERROR_DELTA_MS);
    }

    return () => {
      clearTimer(undefined);
    };
  }, [shown, duration, delay, clearTimer, setTimer]);

  return [exists, visible, finished];
};