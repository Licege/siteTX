import React from "react";
import DataTable from 'react-data-table-component'

const Table = ({
                 data,
                 columns,
                 progressPending,
                 pagination = false,
                 paginationServer = false,
                 paginationTotalRows,
                 selectableRows = false,
                 onChangeRowsPerPage,
                 onChangePage
}) => {
  const _columns = React.useMemo(() => columns, []);

  return (
    <DataTable columns={_columns}
               data={data}
               progressPending={progressPending}
               pagination={pagination}
               paginationServer={paginationServer}
               paginationTotalRows={paginationTotalRows}
               selectableRows={selectableRows}
               onChangeRowsPerPage={onChangeRowsPerPage}
               onChangePage={onChangePage}
    />
  )
}

export default Table