import { useState } from 'react';
import cn from 'classnames';
import c from './BurgerButton.module.css';

interface BurgerButtonProps {
  onClick?: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
    onClick?.();
  };

  return (
    <div className={cn(c.BurgerButton, isOpened && c.open)} onClick={handleClick}>
      <span />
    </div>
  );
};

