import MainLayout from '../components/MainLayout'
import classes from '../styles/employees.module.css';
import EmployeeCard from "../components/EmployeeCard";
import {BlockWithLabel} from "../components/Block";

const Home = ({ employees }) => {
  return (
    <MainLayout>
      <BlockWithLabel className={classes.employees} label="Выберите сотрудника">
        <div className={`${classes.employees__list}`}>
          {employees.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
        </div>
      </BlockWithLabel>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/employees`)
  const employees = await response.json()

  return {
    props: { employees }
  }
}

export default Home
