import React from "react";
import { Page } from "../../../components/common/Page";
import { tableConfig } from './config';
import Table from '../../../components/UI/Table'
import {useEmployees} from "../../../redux/hooks/employees.hooks";

const EmployeesPage = () => {
  const { employees, total, handlePageChange, handleChangePerPage, handleSort, redirectToCreateNewEmployee } = useEmployees();

  return (
    <Page title='Сотрудники' buttonTitle='Добавить сотрудника' onButtonClick={redirectToCreateNewEmployee}>
      <Table data={employees}
             paginationTotalRows={total}
             onChangePage={handlePageChange}
             onChangeRowsPerPage={handleChangePerPage}
             onSort={handleSort}
             columns={tableConfig.columns}
             {...tableConfig.options}
      />
    </Page>
  )
}

export default EmployeesPage