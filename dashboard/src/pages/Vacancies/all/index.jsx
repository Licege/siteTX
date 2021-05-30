import React from 'react'
import Header from './Header'
import CardVacancies from './CardVacancies'

const Vacancies = () => (
    <div>
      <Header />
      <div className="page-container">
        <div className="card-body vacancies">
          <CardVacancies />
        </div>
      </div>
    </div>
  )

export default Vacancies
