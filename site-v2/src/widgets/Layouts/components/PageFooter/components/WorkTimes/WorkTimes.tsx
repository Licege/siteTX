import { Typography, Icon } from '@components';
import c from './WorkTimes.module.css';

interface WorkTimesProps {
  openHours: string[];
}

const ICON_SIZE = 16;

export const WorkTimes = ({ openHours }: WorkTimesProps) => {
  return (
    <div className={c.WorkTimes}>
      <div className={c.title}>
        <Icon iconName="hours" width={ICON_SIZE} height={ICON_SIZE} />
        <Typography variant="title5" maxLines={1} weight="regular">Часы работы</Typography>
      </div>
      {openHours.map((item, index) => (
        <Typography key={index} className={c.time} maxLines={1} variant="body2">{item}</Typography>
      ))}
    </div>
  );
};