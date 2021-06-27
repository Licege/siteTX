import React from 'react'
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'

interface IProps {
    value?: number,
    size?: number
    countStars?: number
    disabled?: boolean

    onChange?: ( value: number ) => void
}

interface IState {
    value: number
    hover: number | null
}

class Rating extends React.PureComponent<IProps, IState> {
  constructor( props: IProps ) {
    super(props)
    this.state = {
      value: props.value || 3,
      hover: null,
    }
  }

    onChange = ( value: number ) => () => {
      if (!this.props.disabled) {
        this.props.onChange && this.props.onChange(value)
        this.setState({ value })
      }
    }

    changeFocus = ( value: number | null ) => () => {
      !this.props.disabled && this.setState({ hover: value })
    }

    render() {
      const { value, hover } = this.state

      return (
        <div>
          {[...Array(this.props.countStars || 5)].map(( star, i ) => {
                    const ratingValue = i + 1

                    return (
                      <StarsWrapper key={ratingValue}>
                        <input type='radio'
                               name='rating'
                               value={ratingValue}
                               onClick={this.onChange(ratingValue)}/>
                        <FaStar size={this.props.size || 50}
                                color={ratingValue <= (hover || value) ? 'ffc107' : 'e4e5e9'}
                                onMouseEnter={this.changeFocus(ratingValue)}
                                onMouseLeave={this.changeFocus(null)}/>
                      </StarsWrapper>
                    )
                })}
        </div>
      )
    }
}

const StarsWrapper = styled.label`
    svg {
        cursor: pointer;
        transition: 200ms;
    }

    input[type = 'radio'] {
        display: none;
    }
`

export default Rating
