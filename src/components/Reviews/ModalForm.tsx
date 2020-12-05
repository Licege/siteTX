import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@material-ui/core/Button'
import renderTextField from '../common/elements/form/RenderTextField'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import Slide from '@material-ui/core/Slide/Slide'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import renderCheckbox from '../common/elements/form/RenderCheckbox'
import validate from './Validate'
import { IReview } from '../../types/types'
import renderRatingField from '../common/elements/form/RenderRating'

interface IProps {
    isOpen: boolean
    handleClose: () => void
}

interface IMapStateToProps {
    form: string
    enableReinitialize: boolean
}

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

const ModalForm: React.FC<InjectedFormProps<IReview & IMapStateToProps, IProps> & IProps>
    = ({
            isOpen,
           handleClose,
           handleSubmit,
    }) => {
    const classes = useStyles()

    return (
        <Dialog open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle>Новый отзыв</DialogTitle>
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
        </Dialog>
    )
}

const ModalReduxForm = reduxForm<IReview & IMapStateToProps, IProps>({
    form: 'modal-create-reviews',
    validate,
    initialValues: {
        rating: 3,
    },
    enableReinitialize: true,
})(ModalForm)

export default ModalReduxForm
