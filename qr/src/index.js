import './styles/index.css'

const employees = [
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест Тестовна', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' },
  { id: 1, name: 'Тестова Тест', imageSrc: 'https://yella-public.s3.eu-central-1.amazonaws.com/employee/photo/wv2EhKncvBxyvCRAqIySWx48JFSizuEFNH08Ji2z.jpg' }
]

function createEmployeeCard(employee) {
  return `
    <a href="./pages/tip.html"">
        <div class="employee">
        <img class="employee__avatar" src="${employee.imageSrc}" alt="" />
        <div class="employee__name">${employee.name}</div>
    </div>
    </a>
  `
}

function fillEmployeesList() {
  const $employeesList = document.getElementById("employees__list");
  $employeesList.innerHTML = "";

  if (employees.length > 0) {
    employees.forEach((employee) => {
      $employeesList.innerHTML += createEmployeeCard(employee)
    })
  }
}

function init() {
  fillEmployeesList()
}

window.addEventListener('DOMContentLoaded', init)