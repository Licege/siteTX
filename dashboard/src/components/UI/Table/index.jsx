import React from "react";
import DataTable from 'react-data-table-component'

const Table = ({
                 data,
                 columns,
                 progressPending = false,
                 highlightOnHover = true,
                 pagination = false,
                 paginationServer = false,
                 paginationTotalRows = 0,
                 paginationPerPage = 10,
                 paginationRowsPerPageOptions = [10, 20, 25],
                 selectableRows = false,
                 onChangeRowsPerPage,
                 onChangePage,
                 sortServer = false,
                 onSort
}) => {
  const _columns = React.useMemo(() => columns, []);

  return (
    <DataTable columns={_columns}
               data={data}
               progressPending={progressPending}
               highlightOnHover={highlightOnHover}
               pagination={pagination}
               paginationServer={paginationServer}
               paginationTotalRows={paginationTotalRows}
               selectableRows={selectableRows}
               onChangeRowsPerPage={onChangeRowsPerPage}
               onChangePage={onChangePage}
               paginationPerPage={paginationPerPage}
               paginationRowsPerPageOptions={paginationRowsPerPageOptions}
               paginationResetDefaultPage={true}
               sortServer={sortServer}
               onSort={onSort}
    />
  )
}

export default Table