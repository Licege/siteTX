import {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getEmployees} from '../getters/employees.getters';
import {fetchAllEmployees} from '../thunks/employees.thunks';

export const useEmployees = ({page = 1, limit = 20} = {}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const employees = useSelector(getEmployees);

  const pagination = {page, limit}

  useEffect(() => {
    dispatch(fetchAllEmployees({pagination}))
  }, [page, limit])

  const fetchEmployees = useCallback(({page, limit}) => {
    const pagination = {page, limit}
    dispatch(fetchAllEmployees({pagination}))
  }, [])

  const redirectToCreateNewEmployee = useCallback(() => history.push('employees/new'), [])

  return {employees, total: employees.length, getEmployees: fetchEmployees, redirectToCreateNewEmployee};
}