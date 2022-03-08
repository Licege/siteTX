import React from 'react'

interface ITour {
  width: number|string
  height: number|string
}

const TOUR_SRC = '//navse360.ru/onlyTour/4421';

const Tour3D: React.FC<ITour> = ({ width = 360, height = 360 }) => (
  <iframe title="tour" src={TOUR_SRC} style={{ width, height }} />
)

export default Tour3D