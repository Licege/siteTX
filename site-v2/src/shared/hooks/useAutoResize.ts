import { RefObject, useLayoutEffect, useRef } from 'react';

interface UseAutoResizeProps {
  value: string;
  minRows: number;
  maxRows?: number;
}

// TODO доработать
export const useAutoResize = ({
  value,
  minRows,
  maxRows
}: UseAutoResizeProps,
inputRef: RefObject<HTMLElement>): void => {
  const rowHeight = useRef<number>(0);

  useLayoutEffect(() => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    input.style.height = 'auto';
    const height = input.scrollHeight;

    if (!rowHeight.current) {
      rowHeight.current = Number.parseInt(window.getComputedStyle(input).lineHeight, 10);
    }

    const nextHeight = maxRows ? Math.min(height, rowHeight.current * maxRows) : height;
    input.style.height = `${nextHeight}px`;
  }, [inputRef, value, minRows, maxRows]);
};