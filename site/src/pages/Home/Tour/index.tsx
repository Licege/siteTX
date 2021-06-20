import React from 'react'
import { useWindowSize } from '../../../hooks/windowResize';
import { SectionWrapper } from '../../../components/core';


const Tour = () => {
    const { width } = useWindowSize()

    return (
        <SectionWrapper>
            <iframe src={process.env._APP_TOUR_SRC} style={{ width: width - 40, height: 360 }} />
        </SectionWrapper>
    )
}

export default Tour