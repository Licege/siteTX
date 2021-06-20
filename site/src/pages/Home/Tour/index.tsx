import React from 'react'
import { useWindowSize } from '../../../hooks/windowResize';
import { SectionWrapper } from '../../../components/core';


const Tour = () => {
    const { width } = useWindowSize()
    const url = "//navse360.ru/onlyTour/4421"

    return (
        <SectionWrapper>
            <iframe src={url} style={{ width: width - 40, height: 360 }} />
        </SectionWrapper>
    )
}

export default Tour