import { NavigationLink } from './components';
import c from './Navigation.module.css';

const LinksList = Object.freeze([
  { to: 'promos', name: 'Акции' },
  { to: 'vacancies', name: 'Работа у нас' },
  { to: 'news', name: 'Новости' },
  { to: 'direct', name: 'Ваше мнение' },
]);

export const Navigation = () => {
  return (
    <ul className={c.Navigation}>
      {LinksList.map(link => (
        <NavigationLink as="li" to={link.to}>{link.name}</NavigationLink>
      ))}
    </ul>
  );
};