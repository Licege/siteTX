import React from 'react'
import { Breadcrumbs, Chip, Theme, withStyles } from '@material-ui/core'

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
    <Breadcrumbs separator='>' component='div' className='breadcrumbs'>
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
    </Breadcrumbs>
  )
}

export default BucketBreadcrumbs