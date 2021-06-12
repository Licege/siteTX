import React, {CSSProperties} from 'react'
import {
    YMaps,
    Map,
    Placemark,
    FullscreenControl,
    TrafficControl,
    TypeSelector,
    ZoomControl,
} from 'react-yandex-maps'
import pointer from '../../../static/img/pointer-map.png'
import { useWindowSize } from '../../../hooks/windowResize';
import { BREAKPOINTS } from '../../../styledComponents/helpers';


interface IProps {
    style?: CSSProperties
}

const setMapBehaviors = (map: any) => {
    if (map) {
        map.behaviors.disable('drag')
        // map.behaviors.disable('scrollZoom')
    }
}

interface ISize {
    width: number
    height: number
}

const calculateSize = (propsSize: any, windowSize: ISize) => {
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

const CustomMap: React.FC<IProps> = ({ style }) => {
    const windowSize = useWindowSize();
    const calculatedSize = calculateSize(style, windowSize)

    const properties = {
        hintContent: '&lt;img src={pointer} /&gt;',
    }

    const pOptions = {
        iconLayout: 'default#image',
        iconImageHref: pointer,
        iconImageSize: [70, 100],
        iconImageOffset: [-34, -76],
    }

    return (
        <YMaps style={calculatedSize} query={{ lang: 'ru_RU' }}>
            <Map style={calculatedSize}
                 defaultState={{
                     center: [54.649906, 20.366676],
                     controls: [],
                     zoom: 17,
                 }}
                 instanceRef={setMapBehaviors}
            >
                <Placemark defaultGeometry={[54.649946, 20.366788]}
                           properties={properties}
                           options={pOptions}/>
                <FullscreenControl/>
                <TrafficControl/>
                <ZoomControl/>
                <TypeSelector/>
            </Map>
        </YMaps>
    )
}

export default CustomMap
