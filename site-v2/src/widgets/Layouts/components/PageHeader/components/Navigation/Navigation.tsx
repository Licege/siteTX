import { NavigationLink } from './components';
import { Link } from '../../PageHeader.types';
import c from './Navigation.module.css';

interface NavigationProps {
  links: Link[]
}

export const Navigation = ({ links }: NavigationProps) => {
  return (
    <ul className={c.Navigation}>
      {links.map((link, index) => (
        <NavigationLink key={index} as="li" to={link.to}>{link.name}</NavigationLink>
      ))}
    </ul>
  );
};
