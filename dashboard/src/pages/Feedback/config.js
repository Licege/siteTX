import {format} from 'date-fns';

export const tableConfig = {
  columns: [
    {
      name: 'E-mail',
      selector: row => row['email'],
      maxWidth: '180px',
      sortable: false
    },
    {
      name: 'Телефон',
      selector: row => row['phone'],
      maxWidth: '160px',
      sortable: false
    },
    {
      name: 'Отправитель',
      selector: row => row['name'],
      maxWidth: '250px',
      sortable: false
    },
    {
      name: 'Создан',
      selector: row => row['createdAt'],
      maxWidth: '160px',
      sortable: false,
      format: row => format(new Date(row.createdAt), 'HH:mm dd.MM.yyyy')
    },
    {
      name: 'Текст',
      selector: row => row['text'],
      sortable: false,
      maxWidth: '500px'
    }
  ],
  options: {
    pagination: true,
    paginationServer: true,
    paginationPerPage: 20,
    paginationRowsPerPageOptions: [10, 20, 30, 50, 100],
    sortServer: true
  }
}
