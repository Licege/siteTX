import { Story, Meta } from '@storybook/react';
import { Typography, TypographyProps } from './Typography';
import { TypographyVariant } from './Typography.types';
import '../style.css';

const TypographyStoryMeta: Meta<TypographyProps> = {
  title: 'Typography',
  component: Typography,
  argTypes: {
    weight: {
      options: ['regular', 'light', 'medium', 'bold'],
      defaultValue: 'regular',
      control: { type: 'radio' }
    },
    align: {
      options: ['left', 'center', 'right'],
      defaultValue: 'left',
      control: { type: 'radio' }
    }
  }
};

export default TypographyStoryMeta;

const variants: TypographyVariant[] = [
  'header',
  'title1',
  'title2',
  'title3',
  'title4',
  'title5',
  'body0',
  'body1',
  'body2',
  'caption1',
  'caption2'
];


export const Default: Story<TypographyProps> = args => (
  <>
    {variants.map(variant => (
      <div key={variant}>
        <Typography {...args} variant={variant}>
          {variant}
        </Typography>
      </div>
    ))}
  </>
);