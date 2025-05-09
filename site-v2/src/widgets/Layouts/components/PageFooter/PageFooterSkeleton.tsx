import { Skeleton } from '@components';
import c from './PageFooter.module.css';

export const PageFooterSkeleton = () => (
  <div className={c.contentWrapper}>
    <div className={c.content}>
      <div className={c.part}>
        <Skeleton height={24} width={160} />
        <Skeleton height={24} width={160} />
      </div>
      <div className={c.part}>
        <Skeleton height={24} width={80} />
        <Skeleton height={24} width={240} />
        <Skeleton height={24} width={240} />
      </div>
    </div>
  </div>
);
