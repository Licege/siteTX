import { Layout, MenuViewer } from '@widgets';
import { AboutSection } from './components';

export const Main = () => {
  return (
    <Layout>
      <AboutSection />
      <MenuViewer />
    </Layout>
  );
};
