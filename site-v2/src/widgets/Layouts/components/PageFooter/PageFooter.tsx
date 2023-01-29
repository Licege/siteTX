import { useMemo } from 'react';
import cn from 'classnames';
import { useRestaurantQuery, SocialNetworks as SocialNetworksI } from '@entities';
import { Contacts, SocialNetworks, WorkTimes, Navigation, Copyright } from './components';
import { Icons } from './components/SocialNetworks/SocialNetworks.types';
import { PageFooterSkeleton } from './PageFooterSkeleton';
import c from './PageFooter.module.css';

interface SocialNetworkItemI {
  name: Icons;
  url: string;
}

function transformSocialNetworks(socialNetworks: SocialNetworksI): SocialNetworkItemI[] {
  return Object.entries(socialNetworks).map(([name, url]) => ({
    name,
    url
  })).filter(item => item.url) as SocialNetworkItemI[];
}

export const PageFooter = () => {
  const { data, isLoading, error } = useRestaurantQuery();

  const socialNetworks = useMemo(() => {
    if (!data) return [];

    return transformSocialNetworks(data.socialNetworks);
  }, [data]);

  const renderFooterContent = () => {
    if (isLoading) {
      return <PageFooterSkeleton />;
    }

    if (error) return null;

    if (data) {
      return (
        <div className={c.contentWrapper}>
          <div className={c.content}>
            <div className={c.part}>
              <WorkTimes openHours={data.openHours} />
              <SocialNetworks socialNetworks={socialNetworks} />
            </div>
            <div className={cn(c.part, c.address)}>
              <Contacts city={data.address.city} street={data.address.street} house={data.address.house} phone={data.phone} />
            </div>
            <div className={c.spacer} />
            <div className={c.part}>
              <Navigation />
            </div>
          </div>
          <Copyright className={c.copyright} />
        </div>
      );
    }
  };

  return (
    <footer className={c.footer}>
      {renderFooterContent()}
    </footer>
  );
};