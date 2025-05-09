import { RefObject, useCallback, useEffect, useRef } from 'react';
import BezierEasing from 'bezier-easing';
import { animate } from '../../utils';
import { TRANSITION_DURATION_MS_NUMBER } from './NavigationCarousel.constants';
import { HorizontalScrollable } from '../HorizontalScrollable';
import c from './NavigationCarousel.module.css';
import { CarouselBubble } from './CarouselBubble';

interface NavigationCarouselItem {
  id: string;
  label: string;
  ref?: RefObject<HTMLButtonElement>;
}

export interface NavigationCarouselProps {
  items: NavigationCarouselItem[];
  selectedId?: string;
  forwardedRef?: RefObject<HTMLDivElement> | (( node: HTMLDivElement | null ) => void);
  onItemClick?: (id: string, label: string, position: number) => void;
}

const TRANSITION_TIMING_FN = BezierEasing(0.25, 0.1, 0.25, 1);

export const NavigationCarousel = ({
  forwardedRef,
  items,
  selectedId,
  onItemClick,
  ...selfProps
}: NavigationCarouselProps) => {
  const rtl = false;

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const selectionPlateRef = useRef<HTMLDivElement>(null);
  const selectedItemWidthRef = useRef<number>();
  const selectedItemOffsetRef = useRef<number>();

  const updatedPlatePosition = useCallback(() => {
    const contentElement = contentRef.current;
    const scrollElement = scrollableRef.current;
    const selectionPlateElement = selectionPlateRef.current;

    if (!contentElement || !selectionPlateElement || !scrollElement) return;

    const { scrollWidth } = scrollElement;
    const selectedWidth = selectedItemWidthRef.current ?? 0;
    const selectedOffset = selectedItemOffsetRef.current ?? 0;
    const currentScroll = scrollElement.scrollLeft;

    const nextScroll =
      (rtl ? -scrollWidth : 0) -
      ((rtl ? -1 : 1) * scrollElement.clientWidth) / 2 +
      selectedWidth / 2 +
      selectedOffset +
      // HorizontalScrollable sizeM padding
      16;

    const diffScroll = nextScroll - currentScroll;

    selectionPlateElement.style.width = `${selectedWidth}px`;

    const selectionPlateCurrentX = selectionPlateElement.offsetLeft;
    const selectionPlateNextX = selectedOffset;
    const selectionPlateDiffX = selectionPlateNextX - selectionPlateCurrentX;

    return animate(TRANSITION_DURATION_MS_NUMBER, TRANSITION_TIMING_FN,
      animationProgress => {
        if (animationProgress !== 1) {
          selectionPlateElement.setAttribute('data-animation-state', 'animating');
        } else {
          requestAnimationFrame(() => {
            selectionPlateElement.setAttribute('data-animation-state', 'completed');
          });
        }

        scrollElement.scrollLeft = currentScroll + diffScroll * animationProgress;
        selectionPlateElement.style.left = `${selectionPlateCurrentX + selectionPlateDiffX * animationProgress}px`;
      });
  }, [rtl]);

  useEffect(() => updatedPlatePosition(), [selectedId, items, updatedPlatePosition]);

  const handleItemSelect = useCallback((element?: HTMLButtonElement) => {
    selectedItemWidthRef.current = element?.clientWidth ?? 0;
    selectedItemOffsetRef.current = element?.offsetLeft ?? 0;
  }, []);

  return (
    <div {...selfProps} ref={forwardedRef}>
      <HorizontalScrollable size="m" forwarderScrollRef={scrollableRef} className={c.scrollable}>
        <div ref={contentRef} className={c.content}>
          <div data-testid="bubble-plate" ref={selectionPlateRef} className={c.selectionPlate} />
          {items.map((item, index) => (
            <CarouselBubble key={item.id} id={item.id} label={item.label} position={index} forwardedRef={item.ref} isSelected={selectedId === item.id} onSelected={handleItemSelect} onClick={onItemClick} />
          ))}
        </div>
      </HorizontalScrollable>
    </div>
  );
};
