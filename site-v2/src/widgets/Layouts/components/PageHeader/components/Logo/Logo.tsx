import cn from 'classnames';
import { Icon } from '@components';
import c from './Logo.module.css';

const LOGO_WIDTH = 96;
const LOGO_HEIGHT = 64;

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <Icon className={cn(className, c.Logo)} iconName="logo" width={LOGO_WIDTH} height={LOGO_HEIGHT} />
);
