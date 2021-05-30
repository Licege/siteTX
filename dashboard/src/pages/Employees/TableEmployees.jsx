import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { getProfessionNameById } from '../../plugins/helpers'
import deleteButton from '../../static/img/close.png'
import { getEmployees, getProfessions } from '../../redux/getters/employees.getters'
import {
  deleteEmployee as deleteEmployeeThunk,
  fetchAllEmployees,
  fetchAllProfessions
} from '../../redux/thunks/employees.thunks'

const TableEmployees = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const employees = useSelector(getEmployees)
  const professions = useSelector(getProfessions)

  useEffect(() => {
    dispatch(fetchAllEmployees())
    dispatch(fetchAllProfessions())
  }, [])

  const redirectToDetail = id => () => history.push(`employees/edit/${id}`)
  const deleteEmployee = id => () => dispatch(deleteEmployeeThunk(id))

  if (!employees.length || !professions.length) return null
  console.log('рендер таблицы')
  console.log(employees)

  return (
    <Table responsive>
      <thead className='table-thread'>
      <tr>
        <th>Должность</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Телефон</th>
        <th>Адрес</th>
      </tr>
      </thead>
      <tbody>
      {employees.map(employee => (
        <tr key={employee.id} onClick={redirectToDetail(employee.id)}>
          <td>{getProfessionNameById(professions, employee.profession)}</td>
          <td>{employee.surname}</td>
          <td>{employee.name}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
          <td>
            <button onClick={deleteEmployee(employee.id)}>
              <img src={deleteButton} alt="Удалить"/>
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

export default TableEmployees;