import React from 'react'
import { Table } from 'react-bootstrap'
import {useCategoriesTableLogic} from '../logic'

const CustomTable = ({ children }) => (
  <Table responsive>
    <thead className="table-thread">
    <tr>
      <th>Название</th>
      <th>Ссылка в адресной строке</th>
      <th>Доставка</th>
      <th />
    </tr>
    </thead>
    <tbody className="table-body">
    {children}
    </tbody>
  </Table>
)

const CategoriesTable = () => {
  const { categories, updateCategory, removeCategory } = useCategoriesTableLogic()

  if (!categories.length) return null

  return (
    <CustomTable>
      {categories.map(category => (
        <tr key={category.id} onClick={updateCategory(category.id)}>
          <td>{category.title}</td>
          <td>{category.titleEn}</td>
          <td>
            <input type="checkbox"
                   checked={category.isDelivery}
                   value={category.isDelivery}
                   disabled
            />
          </td>
          <td>
            <span onClick={removeCategory(category.id)}>Удалить</span>
          </td>
        </tr>
      ))}
    </CustomTable>
  )
}

export default CategoriesTable
