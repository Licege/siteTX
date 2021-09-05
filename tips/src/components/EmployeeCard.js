// import Image from 'next/image';
import classes from '../styles/employee-card.module.css';
import Image from "./Image";
import { useRouter } from "next/router";
import {getFullName} from "../utils";

const EmployeeCard = ({ employee }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tips/${employee.id}`)
  }

  return (
    <div className={classes.employee} onClick={handleClick}>
      <Image src={employee.avatarSrc} className={classes.employee__avatar} alt="" />
      <div className={classes.employee__name}>{getFullName(employee)}</div>
    </div>
  )
}

export default EmployeeCard