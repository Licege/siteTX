import { useState, useLayoutEffect } from 'react';

// TODO do not work correctly
export function useDefineScrollbarWidth() {
  // eslint-disable-next-line
  const [_, setScrollbarWidth] = useState<number|null>(null);

  useLayoutEffect(() => {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollWidth}px`
    );

    setScrollbarWidth(scrollWidth);
  }, []);
}