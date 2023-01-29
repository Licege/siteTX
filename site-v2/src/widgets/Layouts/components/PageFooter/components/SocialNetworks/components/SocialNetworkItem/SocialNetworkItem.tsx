import { FunctionComponent, SVGProps } from 'react';
import * as Assets from '../../assets';
import { Icons } from '../../SocialNetworks.types';
import c from './SocialNetworkItem.module.css';

interface SocialNetworkItemProps {
  name: Icons;
  url: string;
}

const ICON_SIZE = 24;

const iconMap: Record<Icons, FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>> = {
  vk: Assets.Vk,
  fb: Assets.Fb,
  inst: Assets.Instagram,
  tw: Assets.Tw,
  tg: Assets.Tg,
  gmail: Assets.Gmail
};

export const SocialNetworkItem = ({ name, url }: SocialNetworkItemProps) => {
  const Tag = iconMap[name];
  
  return (
    <a className={c.SocialNetworkItem} href={url} target="_blank" rel="noopener noreferrer">
      <Tag width={ICON_SIZE} height={ICON_SIZE} />
    </a>
  );
};