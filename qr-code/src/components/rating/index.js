import {useState} from "react";
import StarIcon from "./StarIcon";

function moreThanIndex(index, hoverValue, ratingValue) {
  return (hoverValue || ratingValue) && (hoverValue || ratingValue) > index;
}

const Rating = ({
                  value = null,
                  onClick,
                  stars = 5,
                  size = 25,
                  fillColor = '#f1a545',
                  emptyColor = '#cccccc',
                  className = '',
                  children
                }) => {
  const [hoverValue, setHoverValue] = useState(value)

  const changeValue = (index) => () => {
    if (onClick) {
      onClick(index + 1)
    }
  }

  const changeHoverValue = (index) => () => {
    setHoverValue(index + 1)
  }

  const purgeHoverValue = () => {
    setHoverValue(null)
  }

  return (
    <span className={className}>
      {
        [...Array(stars)].map((_, index) => (
            <span key={index}
                  onClick={changeValue(index)}
                  onMouseEnter={changeHoverValue(index)}
                  onMouseLeave={purgeHoverValue}
                  style={{
                    width: size,
                    height: size,
                    color: moreThanIndex(index, hoverValue, value) ? fillColor : emptyColor,
                    cursor: 'pointer',
                    transition: 'color 0.2s easy-in-out 0s',
                    display: 'inline-flex'
                  }}
                  aria-hidden
            >
            {children || <StarIcon size={size} />}
          </span>
          )
        )
      }
    </span>
  )
}

export default Rating