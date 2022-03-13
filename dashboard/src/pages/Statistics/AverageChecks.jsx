import React from 'react'
import {Page} from '../../components/common/Page'
import {deliveryHD} from '../../plugins/hardData'
import {CustomDatePicker} from '../../components/common/CustomDatePicker'

const Check = (item, key) => (
  <div key={key} className="card">
    <div>{deliveryHD.paymentType[item._id]}</div>
    <div>Выручка: {item.avg_delivery_check}</div>
    <div>Количество заказов: {item.count}</div>
  </div>
)

// const getRevenue = (allChecks) => {
//     return allChecks.reduce((acc, check) => acc + check.avg_delivery_check, 0)
// }

export const AverageChecks = ({avgChecks, startDate, endDate, handleChange, changeFilter, clearFilter}) => {
  return (
    <Page title="Средний чек">
      <div className="card filter">
        <div className="card-body filter-container">
          <span className="filter-header">Фильтры</span>
          <div className="filter-main">
            <CustomDatePicker value={startDate} handleChange={handleChange('start')} isClearable={true} />
            <CustomDatePicker value={endDate} handleChange={handleChange('end')} isClearable={true} />
          </div>
          <div className="filter-actions">
            <span className="filter-actions-reset" onClick={clearFilter}>Сбросить</span>
            <span className="filter-actions-apply" onClick={changeFilter}>Фильтровать</span>
          </div>
        </div>
      </div>

      {avgChecks.map(Check)}

      {/*<div>Общая выручка за период: {getRevenue(avgChecks)}</div>*/}
    </Page>
  )
}
