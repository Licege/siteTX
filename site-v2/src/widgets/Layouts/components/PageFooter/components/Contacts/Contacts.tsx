import { Typography } from '@components';
import { Address, Phone } from './assets';
import c from './Contacts.module.css';

interface ContactsProps {
  city: string;
  street: string;
  house: string;
  phone: string;
}

const ICON_SIZE = 24;
// TODO перенести в бд
const MAP_ADDRESS_LINK = 'https://yandex.ru/maps/22/kaliningrad/?from=api-maps&ll=20.366668%2C54.649906&mode=routes&origin=jsapi_2_1_76&rtext=~54.649946%2C20.366788&rtt=auto&ruri=~&z=17';

function transformAddress(city: string, street: string, house: string): string {
  return [city, street, house].join(', ');
}

export const Contacts = ({ city, street, house, phone }: ContactsProps) => {
  return (
    <div className={c.Contacts}>
      <Typography className={c.title} variant="title3">Адрес</Typography>
      <div className={c.content}>
        <a className={c.link} href={MAP_ADDRESS_LINK} target="_blank" rel="noopener noreferrer">
          <Address height={ICON_SIZE} width={ICON_SIZE} />
          <Typography variant="body2">{transformAddress(city, street, house)}</Typography>
        </a>

        <a className={c.link} href={`tel:${phone}`}>
          <Phone height={ICON_SIZE} width={ICON_SIZE} />
          <Typography variant="body2">{phone}</Typography>
        </a>
      </div>
    </div>
  );
};