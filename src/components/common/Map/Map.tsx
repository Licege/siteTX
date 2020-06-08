import React from 'react'
import {YMaps, Map, Placemark} from "react-yandex-maps";

const CustomMap: React.FC = () => (
    <YMaps>
        <Map defaultState={{center: [54.649906, 20.366676], zoom: 17}}>
            <Placemark defaultGeometry={[54.649946, 20.366788]} />
        </Map>
    </YMaps>
)

export default CustomMap;