import cn from 'classnames';
import { IconName } from './Icon.types';
import { findIconByName } from './Icon.helpers';
import { WithClassName } from '../../types';
import c from './Icon.module.css';

interface IconProps extends WithClassName {
  iconName: IconName;
  width?: number;
  height: number;
}

export const Icon = ({ iconName, className, width, height }: IconProps) => {
  const Component = findIconByName(iconName);

  return <Component className={cn(className, c.Icon)} width={width} height={height} />;
};

