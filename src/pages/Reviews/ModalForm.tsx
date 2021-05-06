import React from 'react'
import { Field, Form } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@material-ui/core/Button'
import renderTextField from '../../components/common/elements/form/RenderTextField'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import Slide from '@material-ui/core/Slide/Slide'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import renderCheckbox from '../../components/common/elements/form/RenderCheckbox'
import validate from './Validate'
import { IReview } from '../../types/types'
import renderRatingField from '../../components/common/elements/form/RenderRating'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

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

const ModalForm: React.FC<any>
    = ({
            isOpen,
           handleClose,
           onSubmit,
    }) => {
    const classes = useStyles()

    return (
        <Dialog open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle>Новый отзыв</DialogTitle>
            <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.root}>
                  <DialogContent>
                      <div>
                          <Field name='description' component={renderTextField} multiline placeholder='Ваш отзыв'/>
                      </div>
                      <div>
                          <Field name='rating' component={renderRatingField} type='number' sizeStar={25}/>
                      </div>
                      <div>
                          <input name='photo' type='file'/>
                      </div>
                      <div>
                          <Field name='ruleAgree'
                                 component={renderCheckbox}
                                 label='Соглашаюсь на обработку персональных данных и условия пользовательского соглашения'/>
                      </div>
                  </DialogContent>
                  <DialogActions>
                      <Button variant='contained' color='primary' type='submit'>Отправить</Button>
                  </DialogActions>
              </form>
            )} />

        </Dialog>
    )
}

// const ModalReduxForm = reduxForm<IReview & IMapStateToProps, IProps>({
//     form: 'modal-create-reviews',
//     validate,
//     initialValues: {
//         rating: 3,
//     },
//     enableReinitialize: true,
// })(ModalForm)

export default ModalForm
