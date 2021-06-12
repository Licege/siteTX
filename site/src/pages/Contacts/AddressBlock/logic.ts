import { useMemo } from 'react';
import { BREAKPOINTS } from '../../../styledComponents/helpers';
import { useWindowSize } from '../../../hooks/windowResize';


interface ISize {
    width: number
    height: number
}

const calculateSize = (windowSize: ISize) => {
    let width

    if (BREAKPOINTS['ts'] > windowSize.width) {
        width = Math.max(windowSize.width * 0.9, 240)
    } else {
        width = Math.min(windowSize.width * 0.5 - 48, 360)
    }

    const height = Math.max(width, 320);

    return {
        width,
        height
    }
}

export const useAddressBlockMapSize = () => {
    const windowSize = useWindowSize()
    return useMemo(() => calculateSize(windowSize), [windowSize])
}