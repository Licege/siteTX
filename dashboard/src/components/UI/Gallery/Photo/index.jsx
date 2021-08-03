import React from "react";

const Photo = ({ index, photo, onClick = () => {} }) => {
  const handleClick = event => {
    onClick(event, { photo, index })
  }


  return (
    <img {...photo} onClick={handleClick} draggable={false} alt='img' />
  )
}

export default Photo