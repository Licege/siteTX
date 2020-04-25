import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from "@material-ui/core/Button";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import {TransitionProps} from '@material-ui/core/transitions/transition';
import Slide from '@material-ui/core/Slide/Slide';
import renderCheckbox from "../common/elements/RenderCheckbox";
import validate from "./Validate";
import {IReview} from "../../types/types";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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
    return <Slide direction="up" ref={ref} {...props} />;
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiFormControl-root': {
                margin: theme.spacing(1),
                width: '200px',
            },
        },
    }),
)

const ModalForm: React.FC<InjectedFormProps & IProps> = ( {isOpen, handleClose, handleSubmit} ) => {
    const classes = useStyles()

    return (
        <Dialog open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle>Новый отзыв</DialogTitle>
            <form onSubmit={handleSubmit} className={classes.root}>
                <DialogContent>
                    <div>
                        <Field name='surname' component={renderTextField} placeholder='Введите фамилию'/>
                    </div>
                        <Field name='forename' component={renderTextField} placeholder='Введите имя'/>
                    <div>
                        <Field name='phone' component={renderTextField} placeholder='Контактный телефон'/>
                    </div>
                    <div>
                        <Field name='description' component={renderTextField} multiline placeholder='Ваш отзыв'/>
                    </div>
                    <div>
                        <input name='photo' type='file'/>
                    </div>
                    <div>
                        <Field name='rule_agree'
                               component={renderCheckbox}
                               label='Соглашаюсь на обработку персональных данных и условия пользовательского соглашения' />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' type='submit'>Отправить</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

let ModalReduxForm = reduxForm<IReview & IMapStateToProps, IProps>({
    form: 'modal-create-reviews',
    validate,
    enableReinitialize: true}) (ModalForm)

export default ModalReduxForm;