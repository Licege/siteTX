import { ReactNode, RefObject } from 'react';
import cn from 'classnames';
import { WithClassName } from '../../types';
import { HorizontalScrollableAlign, HorizontalScrollableSize } from './HorizontalScrollable.types';
import c from './HorizontalScrollable.module.css';

interface HorizontalScrollableProps extends WithClassName {
  size?: HorizontalScrollableSize;
  align?: HorizontalScrollableAlign;
  children?: ReactNode;
  forwarderScrollRef?: RefObject<HTMLDivElement>;
  onScroll?: () => void;
  dataTestId?: string;
}

export const HorizontalScrollable = ({
  size = 'm',
  align = 'left',
  className,
  children,
  forwarderScrollRef,
  onScroll,
  dataTestId
}: HorizontalScrollableProps) => (
  <div data-testid={dataTestId} className={cn(className, c.HorizontalScrollable)}>
    <div data-testid="horizontal-scrollable-container"
         ref={forwarderScrollRef}
         className={c.scrollable}
         onScroll={onScroll}>
      <div className={c.contentWrapper}>
        <div className={
          cn(c.content, c[`${align}`], {
            [c.sizeS]: size === 's',
            [c.sizeM]: size === 'm'
          })
        }>
          {children}
        </div>
      </div>
    </div>
  </div>
);