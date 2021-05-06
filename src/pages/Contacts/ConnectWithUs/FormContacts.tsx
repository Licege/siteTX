import React from 'react'
import { Field, Form } from 'react-final-form'
import TextField from '../../../components/common/elements/form/RenderTextField'
import validate from './Validate'
import { Button, createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormContactsLogic } from '../logic'

const useStyles = makeStyles(( theme: Theme ) =>
    createStyles({
        root: {
            '& .MuiFormControl-root': {
                margin: theme.spacing(1),
                width: '200px',
            },
        },
    }),
)

const FormContacts = () => {
  const classes = useStyles()
  const { postForm } = useFormContactsLogic()

  return (
    <Form onSubmit={postForm} render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <Field name='name'
                 component={TextField}
                 label='Введите имя'
                 placeholder='Ваше имя'/>
        </div>
        <div>
          <Field name='phone'
                 component={TextField}
                 label='Введите телефон'
                 placeholder='Введите телефон'/>
        </div>
        <div>
          <Field name='comment'
                 component={TextField}
                 label='Ваш вопрос'
                 placeholder='Введите вопрос'
                 as='textarea'
                 rows={6}
          />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>Отправить</Button>
        </div>
      </form>
    )} />
  )
}

export default FormContacts
