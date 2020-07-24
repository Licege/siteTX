import React, {CSSProperties} from 'react'
import {
    YMaps,
    Map,
    Placemark,
    FullscreenControl,
    GeolocationControl,
    TrafficControl,
    TypeSelector,
    ZoomControl
} from "react-yandex-maps";
import pointer from '../../../static/img/pointer-map.png'


interface IProps {
    style?: CSSProperties
}

// const CustomPlacemark: React.FC<IPlacemark> = (coords) => {
//
// }

const CustomMap: React.FC<IProps> = ({style}) => {
    let properties = {
        hintContent: '&lt;img src={pointer} /&gt;'
    }

    let pOptions = {
        iconLayout: 'default#image',
        iconImageHref: pointer,
        iconImageSize: [70, 100],
        // iconImageOffset: [-24, -40]
        iconImageOffset: [-34, -76]
    }

    // const style = {width: '100%', height: '424px'}

    return (
        <YMaps style={style}>
            <Map style={style} defaultState={{
                center: [54.649906, 20.366676],
                controls: [],
                zoom: 17
            }}>
                <Placemark defaultGeometry={[54.649946, 20.366788]}
                           properties={properties}
                           options={pOptions}/>
                <FullscreenControl/>
                <GeolocationControl/>
                <TrafficControl/>
                <ZoomControl/>
                <TypeSelector/>
            </Map>
        </YMaps>
    )
}

export default CustomMap;
