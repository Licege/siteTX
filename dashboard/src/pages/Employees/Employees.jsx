import React from 'react'
// import TableEmployees from './TableEmployees'
import Header from './Header'

const Employees = () => (
  <div>
    <Header />
    <div className='page-container'>
      <div className='card filter'>
        <div className='card-body filter-container'>
          <span className='filter-header'>Фильтры</span>
          <div className='filter-main'>
            <input type='text' placeholder='Фамилия' className='filter-main-input -name form-control'/>
            <input type='text' placeholder='Имя' className='filter-main-input -name form-control'/>
            <input type='text'
                   placeholder='Должность'
                   className='filter-main-input -name form-control'/>
          </div>
          <div className='filter-actions'>
            <span className='filter-actions-reset'>Сбросить</span>
            <span className='filter-actions-apply'>Фильтровать</span>
          </div>
        </div>
      </div>

      {/*<div className='card'>*/}
      {/*    <div className='card-body'>*/}
      {/*        <TableEmployees />*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  </div>
)

export default Employees
