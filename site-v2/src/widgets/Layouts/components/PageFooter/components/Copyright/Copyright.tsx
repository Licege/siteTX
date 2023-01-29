import cn from 'classnames';
import { Typography } from '@components';
import c from './Copyright.module.css';

interface CopyrightProps {
  className?: string;
}

export const Copyright = ({ className }: CopyrightProps) => (
  <div className={cn(className, c.Copyright)}>
    <Typography variant="caption1">
      © Три холма {new Date().getFullYear()}
    </Typography>
  </div>
);
