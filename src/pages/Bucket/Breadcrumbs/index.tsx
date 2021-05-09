import React from 'react'
import { Breadcrumbs, Chip, Theme, withStyles } from '@material-ui/core'
import styled from 'styled-components'

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    height: theme.spacing(5),
    color: theme.palette.grey[200],
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1.5rem',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover, &:focus': {
      color: theme.palette.grey[200],
      textDecoration: 'none',
      backgroundColor: 'white',
      outline: 'none',
    },
  },
}))(Chip) as typeof Chip

interface IProps {
  step: 0|1|2,
  setStep: (step: 0|1|2) => void
}

const BucketBreadcrumbs: React.FC<IProps> = ({ step, setStep }) => {
  return (
    <StyledBreadcrumbs separator='>'>
      <StyledBreadcrumb component='a'
                        className={step === 0 ? 'active' : ''}
                        label='Ваш заказ'
                        onClick={() => setStep(0)}/>
      <StyledBreadcrumb component='a'
                        className={step === 1 ? 'active' : ''}
                        label='Оформление заказа'
                        onClick={() => setStep(1)}/>
      <StyledBreadcrumb component='a'
                        className={step === 2 ? 'active' : ''}
                        label='Заказ оформлен' />
    </StyledBreadcrumbs>
  )
}

const StyledBreadcrumbs = styled(Breadcrumbs)`
  .active {
    color: ${props => props.theme.colors.brown.brand} !important;
  }

  @media(max-width: 768px) {
    margin-bottom: 16px;
  
    .MuiChip-label {
      padding: 0;
      font-size: 12px;
      line-height: 16px;
    }
  
    .MuiBreadcrumbs-separator {
      padding: 0 4px;
      margin: 0;
    }
}
`

export default BucketBreadcrumbs