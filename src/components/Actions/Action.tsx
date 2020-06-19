import React, {CSSProperties} from 'react'
import {promoType} from "../../types/types";
import {fullLink} from "../../plugins/helpers";
import altImg from "../../static/img/dish.svg";
import {Button} from '@material-ui/core';

interface IProps {
    promo: promoType

    goBack: () => void
}

export const Action: React.FC<IProps> = ({promo, goBack}) => {
    const style = {
        backgroundImage: `url(${promo.imageSrc ? fullLink(promo.imageSrc) : altImg})`,
        backgroundSize: "cover"
    } as CSSProperties

    return (
        <div className='promo'>
            <div className='promo-img' style={style} />
            <div className='promo__wrapper'>
                <div className='promo__wrapper-content'>
                    <div className='promo-title'>{promo.title}</div>
                    <div className='promo-description' dangerouslySetInnerHTML={ {__html: promo.description} }/>
                    <div className='promo-actions'>
                        <Button variant='outlined' onClick={goBack}>Все акции</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}