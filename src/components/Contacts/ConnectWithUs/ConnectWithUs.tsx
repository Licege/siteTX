import React from 'react'
import FormContacts from './FormContacts'
import { reviewType } from '../../../types/types'

interface IProps {
    postForm: ( data: reviewType ) => void
}

export const ConnectWithUs: React.FC<IProps> = ( {postForm} ) => (
    <div>
        <h3>Задать вопрос</h3>
        <p>С удовольствием ответим на все вопросы, просто заполните форму:</p>
        <FormContacts onSubmit={postForm}/>
    </div>
)
