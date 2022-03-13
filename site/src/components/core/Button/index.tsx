import { Button as MaterialButton, ButtonProps } from '@material-ui/core'
import classNames from 'classnames';
import styles from './style.module.css';

const Button = ({ className, ...props }: ButtonProps) => <MaterialButton className={classNames({
  [styles['button-secondary']]: props.color === 'secondary'
})} {...props} />

export default Button