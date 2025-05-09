import { Icon } from '@components';
import { Icons } from '../../SocialNetworks.types';
import c from './SocialNetworkItem.module.css';

interface SocialNetworkItemProps {
  name: Icons;
  url: string;
}

const ICON_SIZE = 24;

export const SocialNetworkItem = ({ name, url }: SocialNetworkItemProps) => {
  return (
    <a className={c.SocialNetworkItem} href={url} target="_blank" rel="noopener noreferrer">
      <Icon iconName={name} width={ICON_SIZE} height={ICON_SIZE} />
    </a>
  );
};