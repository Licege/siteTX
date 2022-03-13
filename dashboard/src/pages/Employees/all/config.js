import {format} from 'date-fns';
import {getFullName, toRub} from '../../../plugins/helpers';

export const tableConfig = {
  columns: [
    {
      name: 'ФИО',
      selector: row => getFullName({
        surname: row['lastName'],
        forename: row['firstName'],
        patronymic: row['middleName']
      }),
      maxWidth: '250px',
      sortable: false
    },
    {
      name: 'Должность',
      selector: row => row['position'],
      maxWidth: '160px',
      sortable: false
    },
    {
      name: 'Телефон',
      selector: row => row['phone'],
      maxWidth: '140px',
      sortable: false
    },
    {
      name: 'Заработная плата',
      selector: row => toRub(row['salary']),
      sortable: false,
      maxWidth: '160px'
    },
    {
      name: 'Баланс',
      selector: row => toRub(row['balance']),
      sortable: false,
      maxWidth: '140px'
    },
    {
      name: 'Нанят',
      selector: row => format(new Date(row['dateOfEmployment']), 'dd.MM.yyyy'),
      maxWidth: '140px',
      sortable: false,
    },
    {
      name: 'Дата увольнения',
      selector: row => row['dateOfDismissal'] ? format(new Date(row['dateOfDismissal']), 'dd.MM.yyyy') : '-',
      maxWidth: '140px',
      sortable: false,
    },
  ],
  options: {
    pagination: true,
    paginationServer: true,
    paginationPerPage: 20,
    paginationRowsPerPageOptions: [10, 20, 30, 50, 100],
    sortServer: true
  }
}
