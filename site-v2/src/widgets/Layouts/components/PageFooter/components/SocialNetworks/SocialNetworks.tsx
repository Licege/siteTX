import { SocialNetworkItem } from './components';
import { Icons } from './SocialNetworks.types';
import c from './SocialNetworks.module.css';

interface SocialNetworkItemI {
  name: Icons;
  url: string;
}

interface SocialNetworksProps {
  socialNetworks: SocialNetworkItemI[];
}

export const SocialNetworks = ({ socialNetworks }: SocialNetworksProps) => {
  return (
    <div className={c.SocialNetworks}>
      {socialNetworks.map((item) => <SocialNetworkItem key={item.name} name={item.name} url={item.url} />)}
    </div>
  );
};
