import { useState } from 'react';
import cn from 'classnames';
import { BurgerButton } from '../BurgerButton';
import { Link } from '../../PageHeader.types';
import c from './MobileMenu.module.css';

interface MobileMenuProps {
  links: Link[];
}

export const MobileMenu = ({ links }: MobileMenuProps) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => {
    setShown(!shown);
  };

  return (
    <>
      <BurgerButton onClick={toggleShown} />
      <div className={cn(c.MobileMenu, shown && c.shown)}>
        {links.map((link, index) => (
          <div key={index}>{link.name}</div>
        ))}
      </div>
    </>
  );
};
