import { useState } from 'react';
import cn from 'classnames';
import { BurgerButton } from '../BurgerButton';
import { Link } from '../../PageHeader.types';
import { WithClassName } from '@types';
import c from './MobileMenu.module.css';

interface MobileMenuProps extends WithClassName {
  links: Link[];
}

export const MobileMenu = ({ className, links }: MobileMenuProps) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => {
    setShown(!shown);
  };

  return (
    <div className={className}>
      <BurgerButton onClick={toggleShown} />
      <div className={cn(c.MobileMenu, shown && c.shown)}>
        <div className={c.content}>
          {links.map((link, index) => (
            <div key={index}>{link.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
