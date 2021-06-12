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

const CustomMap: React.FC<IProps> = ({ style }) => {
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
        <YMaps style={style} query={{ lang: 'ru_RU' }}>
            <Map style={style}
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
