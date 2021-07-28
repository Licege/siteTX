import {format} from "date-fns";

export const tableConfig = {
  columns: [
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Телефон',
      selector: 'phone',
    },
    {
      name: 'Отправитель',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Создан',
      selector: 'createdAt',
      sortable: true,
      format: row => format(new Date(row.createdAt), 'HH:mm dd.MM.yyyy')
    },
    {
      name: 'Текст',
      selector: 'text'
    }
  ],
  options: {
    pagination: true,
    paginationServer: true,
  }
}
