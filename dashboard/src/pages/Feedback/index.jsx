import React from "react";
import { Page } from "../../components/common/Page";
import { tableConfig } from './config';
import { useFeedbackLogic } from './logic'
import Table from '../../components/UI/Table'

const Feedback = () => {
  const { complains, total, handlePageChange, handleChangePerPage, handleSort } = useFeedbackLogic();

  return (
    <Page title='Обратная связь'>
      <Table data={complains}
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

export default Feedback