import { NavigationLink } from './components';
import c from './Navigation.module.css';

const LinksList = Object.freeze([
  { to: '/', name: 'Главная' },
  { to: '/promos', name: 'Акции' },
  { to: '/news', name: 'События' },
  { to: '/about', name: 'О нас' },
]);

export const Navigation = () => {
  return null;

  return (
    <ul className={c.Navigation}>
      {LinksList.map(link => (
        <NavigationLink key={link.to} as="li" to={link.to}>{link.name}</NavigationLink>
      ))}
    </ul>
  );
};
