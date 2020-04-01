import React from 'react';
import {orderType} from "../../types/types";
import MyDateTimePicker from "../common/elements/MyDateTimePicker";
import Button from "react-bootstrap/Button";


type PropsType = {
    postOrder: (order: orderType) => void
    choiceDate: (date: Date | null) => void
}

const Order: React.FC<PropsType> = ( {postOrder, choiceDate} ) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='page-title'>~ Бронирование столов ~</h4>
                <p>Описание тут</p>
                <div className='order'>
                    <div>
                        <input placeholder='Ваше имя' />
                    </div>
                    <div>
                        <input placeholder='Телефон' />
                    </div>
                    <MyDateTimePicker choiceDate={choiceDate} />
                    <select>
                        <option value={undefined}>Количество гостей</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='100'>Банкет</option>
                    </select>
                    <textarea cols={30} rows={2} placeholder='Ваши коментарии' />
                    <Button variant='primary' className='order-button' >Забронировать</Button>
                </div>
            </div>
        </div>
    )
};

export default Order;