import { ReactNode } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Typography } from '@components';
import c from './NavigationLink.module.css';

interface NavigationLinkProps {
  as?: 'li' | 'span' | 'div';
  to: string;
  children: ReactNode;
}

interface GetLinkClassNameProps {
  isActive: boolean;
  isPending: boolean;
}

function getLinkClassName({ isActive }: GetLinkClassNameProps): string {
  return cn(c.link, {
    [c.active]: isActive
  });
}

export const NavigationLink = ({ as: Tag = 'li', to, children }: NavigationLinkProps) => {
  return (
    <Tag className={c.NavigationLink}>
      <NavLink to={to} className={getLinkClassName}>
        <Typography variant="title2">
          {children}
        </Typography>
      </NavLink>
    </Tag>
  );
};