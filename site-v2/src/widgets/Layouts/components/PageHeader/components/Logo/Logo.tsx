import cn from 'classnames';
import { Logo as LogoSVG } from '@assets';
import c from './Logo.module.css';

const LOGO_WIDTH = 96;
const LOGO_HEIGHT = 64;

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <LogoSVG className={cn(className, c.Logo)} width={LOGO_WIDTH} height={LOGO_HEIGHT} />
);
