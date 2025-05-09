import { useConfig } from '@hooks';
import { Logo, Navigation, MobileMenu } from './components';
import c from './PageHeader.module.css';

export const PageHeader = () => {
  const { header } = useConfig();

  return (
    <header className={c.header}>
      <div className={c.content}>
        <Logo />
        <Navigation className={c.navigation} links={header.navigations} />
        <MobileMenu className={c.mobileMenu} links={header.navigations} />
      </div>
    </header>
  );
};
