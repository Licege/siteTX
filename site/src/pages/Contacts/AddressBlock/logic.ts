import { useWindowSize } from '@/hooks';

function calcWidth(windowWidth: number) {
  let maxWidth = 1150;
  let padding = 48;

  if (windowWidth < 1200) {
    padding = 48
    maxWidth = 800
  }

  if (windowWidth < 576) {
    padding = 32
    maxWidth = 576
  }

  return Math.min(windowWidth, maxWidth) - padding;
}

export const useAddressBlockMapSize = () => {
  const { width } = useWindowSize()

  return { width: calcWidth(width), height: 320 }
}