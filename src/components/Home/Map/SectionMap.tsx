import React from 'react'
import Map from '../../common/Map/Map'

interface IProps {

}

const SectionMap: React.FC<IProps> = () => (
    <div className='Section-map'>
        <Map style={{width: '100%', height: '424px'}}/>
    </div>
)

export default SectionMap
