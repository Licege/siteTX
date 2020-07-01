import React from 'react'
import {YMaps, Map, Placemark} from "react-yandex-maps";
import pointer from '../../../static/img/pointer-map.png'


interface IPlacemark {
    coords: Array<number>
}

// const CustomPlacemark: React.FC<IPlacemark> = (coords) => {
//
// }

const CustomMap: React.FC = () => {
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

    return (
        <YMaps>
            <Map defaultState={{center: [54.649906, 20.366676], zoom: 17}}>
                    <Placemark defaultGeometry={[54.649946, 20.366788]}
                               properties={properties}
                               options={pOptions} />
            </Map>
        </YMaps>
    )
}

export default CustomMap;
