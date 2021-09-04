// import Image from 'next/image';
import classes from '../styles/employee-card.module.css';
import Image from "./Image";
import { useRouter } from "next/router";

const EmployeeCard = ({ employee }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tips/${employee.id}`)
  }

  return (
    <div className={classes.employee} onClick={handleClick}>
      <Image src={employee.imageSrc} className={classes.employee__avatar} alt="" />
      <div className={classes.employee__name}>{employee.name}</div>
    </div>
  )
}

export default EmployeeCard