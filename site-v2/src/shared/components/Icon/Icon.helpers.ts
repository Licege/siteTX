import { IconName, ReactSvgType } from './Icon.types';
import * as Assets from './assets';

export function findIconByName(iconName: IconName): ReactSvgType {
  switch (iconName) {
    case 'hours':
      return Assets.Hours;
    case 'logo':
      return Assets.Logo;
    case 'fb':
      return Assets.Fb;
    case 'vk':
      return Assets.Vk;
    case 'tg':
      return Assets.Tg;
    case 'tw':
      return Assets.Tw;
    case 'gmail':
      return Assets.Gmail;
    case 'instagram':
      return Assets.Instagram;
    case 'close':
      return Assets.Close;
    default: {
      throw new Error(`Incorrect icon name was passed: ${iconName}`);
    }
  }
}