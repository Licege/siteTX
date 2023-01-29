import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from 'react';
import cn from 'classnames';
import { ButtonForm, ButtonSize, ButtonVariant } from './Button.types';
import { WithClassName } from '../../types';
import { useAnimation } from '../../hooks';
import { TypographyVariant, TypographyWeight, Typography } from '../Typography';
import { Spinner } from '../Spinner';
import c from './Button.module.css';

export interface ButtonProps extends WithClassName{
  size: ButtonSize;
  form?: ButtonForm;
  variant: ButtonVariant;
  loading?: boolean;
  as?: 'button' | 'div' | 'span';
  withClickable?: boolean;
  disabled?: boolean;
  stretched?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit';
}

const getTextVariant = (size: ButtonSize): TypographyVariant => {
  if (size === 'xs') return 'caption1';

  return 'body2';
};

const getTextWeight = (variant: ButtonVariant): TypographyWeight => {
  if (variant === 'action') {
    return 'medium';
  }

  return 'regular';
};

export const Button = forwardRef<HTMLElement, ButtonProps>(({
  className,
  size,
  variant,
  form = 'squire',
  children = '',
  disabled = false,
  loading = false,
  withClickable = true,
  stretched = false,
  as: Tag = 'button',
  type = 'button',
  ...buttonProps
}, ref) => {
  const [spinnerExists, spinnerVisible] = useAnimation(150, loading);

  const withTextContent = typeof children === 'string';
  const content = withTextContent
    ? (
      <Typography className={cn(c.textContent, c.textContentForm, c[form], c[size])}
                  variant={getTextVariant(size)}
                  weight={getTextWeight(variant)}
                  align="center">
        {children}
      </Typography>
    )
    : children;

  return (
    <Tag ref={ref as ForwardedRef<HTMLButtonElement & HTMLDivElement>}
         className={cn(
        className,
        c.Button,
        c[variant],
        c[size],
        c[form],
        {
          [c.clickable]: withClickable,
          [c.stretched]: stretched,
          [c.disabled]: disabled || loading,
          [c.loading]: loading,
          [c.withTextContent]: withTextContent
        }
      )}
         disabled={disabled || loading}
         type={Tag === 'button' ? type : undefined}
         {...buttonProps}>
      <span className={c.contentWrapper}>
        <span className={c.content}>{content}</span>
        {spinnerExists ? (
          <span className={cn(c.spinner, spinnerVisible && c.visible)}>
            <Spinner as="span" size="s" />
          </span>
        ) : null}
      </span>
    </Tag>
  );
});
