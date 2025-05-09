import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { sanitize } from '../../utils';
import { TypographyAlign, TypographyLeading, TypographyVariant, TypographyWeight } from './Typography.types';
import { WithClassName } from '../../types';
import c from './Typography.module.css';

export type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';

const TypographyVariantToTagMapping: Record<TypographyVariant, TextTag> = {
  header: 'h1',
  title1: 'h2',
  title2: 'h3',
  title3: 'h4',
  title4: 'h5',
  title5: 'h6',
  body0: 'span',
  body1: 'span',
  body2: 'span',
  caption1: 'span',
  caption2: 'span',
};

export interface TypographyProps extends WithClassName {
  variant: TypographyVariant;
  children: ReactNode | number | string;
  style?: CSSProperties;
  weight?: TypographyWeight;
  leading?: TypographyLeading;
  align?: TypographyAlign;
  as?: TextTag;
  html?: boolean;
  maxLines?: number;
  color?: string;
  uppercase?: boolean;
  dataTestId?: string;
}


export const Typography = ({
  className,
  children,
  variant,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  weight = 'regular',
  leading = 'normal',
  align = 'left',
  html = false,
  maxLines,
  color,
  uppercase = false,
  as: Tag = TypographyVariantToTagMapping[variant] || 'span',
  dataTestId,
  ...selfProps
}: TypographyProps) => {
  const targetProps: HTMLAttributes<HTMLElement> = {
    className: cn(className, c.Typography, c[variant], c[weight], c[leading], c.alignLeft, {
      [c.alignLeft]: align === 'left',
      [c.alignRight]: align === 'right',
      [c.alignCenter]: align === 'center',
      [c.clamp]: typeof maxLines === 'number',
      [c.uppercase]: uppercase,
    }),
    style: {
      ...selfProps.style,
      color,
      WebkitLineClamp: maxLines,
    }
  };

  if (html && typeof children !== 'object') {
    targetProps.dangerouslySetInnerHTML = { __html: sanitize(String(children)) };
  } else {
    targetProps.children = children;
  }

  return <Tag {...targetProps} data-testid={dataTestId} />;
};
