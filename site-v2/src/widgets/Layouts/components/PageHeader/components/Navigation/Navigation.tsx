import cn from 'classnames';
import { WithClassName } from '@types';
import { NavigationLink } from './components';
import { Link } from '../../PageHeader.types';
import c from './Navigation.module.css';

interface NavigationProps extends WithClassName {
  links: Link[]
}

export const Navigation = ({ className, links }: NavigationProps) => {
  return (
    <ul className={cn(className, c.Navigation)}>
      {links.map((link, index) => (
        <NavigationLink key={index} as="li" to={link.to}>{link.name}</NavigationLink>
      ))}
    </ul>
  );
};
