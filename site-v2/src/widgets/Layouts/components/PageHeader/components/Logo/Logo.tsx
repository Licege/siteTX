import cn from 'classnames';
import { Icon } from '@components';

const LOGO_WIDTH = 96;
const LOGO_HEIGHT = 64;

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <Icon className={cn(className)} iconName="logo" width={LOGO_WIDTH} height={LOGO_HEIGHT} />
);
