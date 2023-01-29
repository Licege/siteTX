import { Typography } from '@components';
import { Hours } from '../../assets';
import c from './WorkTimes.module.css';

interface WorkTimesProps {
  openHours: string[];
}

const ICON_SIZE = 16;

export const WorkTimes = ({ openHours }: WorkTimesProps) => {
  return (
    <div className={c.WorkTimes}>
      <div className={c.title}>
        <Hours width={ICON_SIZE} height={ICON_SIZE} />
        <Typography variant="title3">Часы работы</Typography>
      </div>
      {openHours.map((item, index) => (
        <Typography key={index} className={c.time} variant="body2">{item}</Typography>
      ))}
    </div>
  );
};