import { SVGProps, FunctionComponent } from 'react';

export type ReactSvgType = FunctionComponent<
  SVGProps<SVGSVGElement> & {
  title?: string;
}
  >;

export type IconName =
  | 'vk'
  | 'fb'
  | 'instagram'
  | 'tw'
  | 'tg'
  | 'gmail'
  | 'hours'
  | 'logo'
  | 'close'