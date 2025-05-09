import { ReactNode } from 'react';
import { PageHeader, PageFooter } from '../components';
import c from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={c.layout}>
      <PageHeader />
      <div className={c.container}>
        <div className={c.content}>
          {children}
        </div>
        <PageFooter />
      </div>
    </div>
  );
};
