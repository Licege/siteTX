import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';
import { WithClassName } from '../../../types';
import { Typography } from '../../Typography';
import c from './CarouselBubble.module.css';

interface CarouselBubbleProps extends WithClassName {
  id: string;
  label: string;
  position: number;
  isSelected?: boolean;
  forwardedRef?: RefObject<HTMLButtonElement>
  onSelected?: (element?: HTMLButtonElement) => void
  onClick?: (id: string, label: string, position: number) => void
}

export const CarouselBubble = ({
  id,
  label,
  position,
  isSelected,
  forwardedRef,
  onSelected,
  onClick,
  className
}: CarouselBubbleProps) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  const ref = forwardedRef ?? innerRef;

  const handleClick = useCallback(() => {
    onClick?.(id, label, position);
  }, [id, label, position, onClick]);

  useEffect(() => {
    if (isSelected) {
      onSelected?.(ref.current ?? undefined);
    }
  }, [ref, isSelected, onSelected]);

  return useMemo(() => (
    <button data-testid="carousel-bubble"
            data-item-id={id}
            className={cn(
        c.clearButton,
        className,
        c.carouselBubble,
        {
          [c.isSelected]: isSelected
        }
      )}
            id={id}
            ref={ref}
            onClick={handleClick}
            type="button">
      <Typography className={c.label} variant="caption1" weight="medium" align="center">
        {label}
      </Typography>
    </button>
  ), [id, label, className, isSelected, ref, handleClick]);
};
