import React, {ReactNode} from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
    settings?: Object
    children: ReactNode
}

export default class CustomSlider extends React.PureComponent<IProps> {
    render() {
        const {settings, children} = this.props
        const defaultSettings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            initialSlide: 0,
            autoplay: true,
            autoplaySpeed: 10000,
            centerMode: true,
            centerPadding: '60px',
            pauseOnHover: true,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

        const resSettings = Object.assign(defaultSettings, settings)

        return (<Slider {...resSettings}>
            {children}
        </Slider>)
    }
}