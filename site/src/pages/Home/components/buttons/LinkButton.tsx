import styled from 'styled-components';
import RedirectButton, { LinkButtonProps } from '@/components/common/elements/buttons/LinkButton'

export function LinkButton(props: LinkButtonProps) {
  return (
    <Button {...props} />
  )
}

const Button = styled(RedirectButton)`
{
  text-align: center;

  button {
    display: block;
    margin: 0 auto;
    color: ${props => props.theme.colors.brown.brand};
    font-weight: 600;
    border-color: ${props => props.theme.colors.brown.brand};
    border-radius: 50px;
    transition: .4s;

    &:hover {
      color: #f9f9f9;
      background-color: ${props => props.theme.colors.brown.brand};
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
  }
}
`
