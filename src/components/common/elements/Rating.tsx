import React from 'react'
import { FaStar } from "react-icons/fa";

interface IProps {
    value?: number,
    size?: number
    countStars?: number

    onChange: (value: number) => void
}

interface IState {
    value: number
    hover: number | null
}

class Rating extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        console.log(props.onChange);
        this.state = {
            value: props.value || 3,
            hover: null
        }
        //this.props.onChange.bind(this)
    }

    onChange = (value: number) => {
        return () => {
            this.props.onChange(value)
            this.setState({value})
        }
    }

    changeFocus = (value: number | null) => {
        return () => {
            this.setState({hover: value})
        }
    }

    render() {
        const {value, hover} = this.state

        return (
            <div>
                {[ ...Array(this.props.countStars || 5)].map((star, i) => {
                    const ratingValue = i + 1

                    return (
                        <label className='star' key={ratingValue}>
                            <input
                                type='radio'
                                name='rating'
                                value={ratingValue}
                                onClick={this.onChange(ratingValue)}
                            />
                            <FaStar
                                size={this.props.size || 50}
                                color={ratingValue <= (hover || value) ? 'ffc107' : 'e4e5e9'}
                                onMouseEnter={this.changeFocus(ratingValue)}
                                onMouseLeave={this.changeFocus(null)}
                            />
                        </label>
                    )
                })}
            </div>
        )
    }
}

export default Rating;