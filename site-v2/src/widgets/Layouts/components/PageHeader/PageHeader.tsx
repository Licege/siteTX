import { Logo, Navigation } from './components';
import c from './PageHeader.module.css';

export const PageHeader = () => {
  return (
    <header className={c.header}>
      <div className={c.content}>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};
