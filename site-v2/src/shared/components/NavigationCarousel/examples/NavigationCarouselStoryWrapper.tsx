import { useCallback, useState, ReactNode } from 'react';
import { NavigationCarouselProps } from '../NavigationCarousel';

interface NavigationCarouselStoryWrapperProps extends NavigationCarouselProps {
  children: (props: Pick<NavigationCarouselProps, 'selectedId' | 'onItemClick'>) => ReactNode
}

export const NavigationCarouselStoryWrapper = ({ children, ...initialProps }: NavigationCarouselStoryWrapperProps) => {
  const [selectedId, setSelectedId] = useState(initialProps.selectedId);

  const handleItemClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 0, width: 350, border: 'solid 1px #e0deda' }}>
      {children({
        selectedId,
        onItemClick: handleItemClick,
      })}
    </div>
  );
};
