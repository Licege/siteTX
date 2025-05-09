import cn from 'classnames';
import c from './Spinner.module.css';
import { WithClassName } from '../../types';
import { HTMLAttributes } from 'react';
import { SpinnerSize } from './Spinner.types';

export interface SpinnerProps extends WithClassName, HTMLAttributes<HTMLDivElement> {
  as: 'div' | 'span',
  size?: SpinnerSize
}

export const Spinner = ({
  className,
  as: Tag = 'div',
  size = 'm',
  ...otherProps
}: SpinnerProps) => {
  return (
    <Tag className={cn(className, c.Spinner, c[size])} {...otherProps} />
  );
};