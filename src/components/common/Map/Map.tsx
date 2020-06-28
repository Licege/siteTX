import React from 'react'
import {YMaps, Map, Placemark, Clusterer} from "react-yandex-maps";
import logo from '../../../static/img/round-logo.png'


interface IPlacemark {
    coords: Array<number>
}

// const CustomPlacemark: React.FC<IPlacemark> = (coords) => {
//
// }

const CustomMap: React.FC = () => {
    let properties = {
        hintContent: '&lt;img src={logo} /&gt;'
    }

    let pOptions = {
        iconLayout: 'default#image',
        iconImageHref: logo,
        iconImageSize: [50, 50],
        iconImageOffset: [-24, -40]
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
