import {useCallback, useState} from "react";
import {useEmployees} from "../../../redux/hooks/employees.hooks";

export const useEmployeesLogic = () => {
  const { employees, total, getEmployees } = useEmployees()
  const [perPage, setPerPage] = useState(10)

  const handlePageChange = useCallback(page => {
    getEmployees({ page, limit: perPage })
  }, [perPage])

  const handleChangePerPage = useCallback((newPerPage, page) => {
    getEmployees({ page, limit: newPerPage })
    setPerPage(newPerPage)
  }, [])

  const handleSort = useCallback((column, direction) => {
  }, [])

  return { employees, total, handlePageChange, handleChangePerPage, handleSort }
}