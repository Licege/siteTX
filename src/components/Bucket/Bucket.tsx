import React from 'react';
import {
    categoryType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost
} from "../../types/types";
import altImg from "../../static/img/dish.svg";
import FormOrder from "./FormOrder";
import {fullLink, getDishesKey} from "../../plugins/helpers";
import {Breadcrumbs, Button, Chip, emphasize, Theme, withStyles} from '@material-ui/core';
import LinkButton from "../common/elements/buttons/LinkButton";
import {Link} from "react-router-dom";
import {SaucesBlock} from "./SaucesBlock";
import {ShowOrder} from "./ShowOrder";

type PropsType = {
    dishes: Array<dishType>
    menu: Array<dishType>
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
    orderPrice: number
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    paymentMethod: string
    deliveryMethod: string
    categories: Array<categoryType>
    step: 0 | 1 | 2

    addDishToBucket: (dish: dishType) => void
    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
    removeDish: (id: string) => void
    clearBucket: () => void
    onSubmit: (data: IDeliveryPost) => void
    onChange: (dish: dishType) => ((event: { target: HTMLInputElement; }) => void)
    setStep: (step: 0 | 1 | 2) => void
    isDisabled: (step: 0 | 1 | 2) => boolean
}

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
            outline: 'none'
        },
        '&:active': {
            // boxShadow: theme.shadows[1],
            // backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    }
}))(Chip) as typeof Chip;

const Bucket: React.FC<PropsType> = (props) => {
    const {
        dishes, menu, step, delivery, deliveryPrice, orderPrice, settings, global_settings, paymentMethod, deliveryMethod, isDisabled,
        increaseDishCount, reduceDishCount, removeDish, clearBucket, onSubmit, onChange, saleForPickup, addDishToBucket, categories, setStep
    } = props;

    const sale = (orderPrice + deliveryPrice) * saleForPickup / 100
    const price = orderPrice + deliveryPrice - sale

    const sauceCategoryId = categories.find(category => category.title === ('Соус' || 'Соусы'))?._id
    const sauces = menu.filter(dish => dish.category_id === sauceCategoryId)

    return (
        <div className='page-container'>
            {!!delivery.order.length ?
                <>
                    <Breadcrumbs separator='>' component='div' className='breadcrumbs'>
                        <StyledBreadcrumb component='a'
                                          className={step === 0 ? 'active' : ''}
                                          disabled={isDisabled(0)}
                                          label='Ваш заказ'
                                          onClick={() => setStep(0)}/>
                        <StyledBreadcrumb component='a'
                                          className={step === 1 ? 'active' : ''}
                                          disabled={isDisabled(1)}
                                          label='Оформление заказа'
                                          onClick={() => setStep(1)}/>
                        <StyledBreadcrumb component='a'
                                          className={step === 2 ? 'active' : ''}
                                          disabled={isDisabled(2)}
                                          label='Заказ оформлен'/>
                    </Breadcrumbs>

                    {step === 0 && <ShowOrder dishes={dishes}
                                              sauces={sauces}
                                              delivery={delivery}
                                              deliveryPrice={deliveryPrice}
                                              saleForPickup={saleForPickup}
                                              orderPrice={orderPrice}
                                              sale={sale}
                                              price={price}
                                              addDishToBucket={addDishToBucket}
                                              increaseDishCount={increaseDishCount}
                                              reduceDishCount={reduceDishCount}
                                              removeDish={removeDish}
                                              clearBucket={clearBucket}
                                              onChange={onChange}
                                              setStep={setStep}/>}

                    {step === 1 && <FormOrder settings={settings}
                                              global_settings={global_settings}
                                              payment_method={paymentMethod}
                                              delivery_method={deliveryMethod}
                                              price={price}
                                              onSubmit={onSubmit}/>}

                    {/*<div className='bucket-header'>
                        <div className='bucket-header-title'>Название:</div>
                        <div className='bucket-header-item'>Количество:</div>
                        <div className='bucket-header-item'>Стоимость:</div>
                    </div>*/}

                    {/*<h3>Корзина</h3>
                    <div className='bucket-table'>
                        {dishes.map(dish => (
                            <div className='bucket-table-row' key={dish._id}>
                                <img className='bucket-table-row-img'
                                     src={dish.imageSrc ? fullLink(dish.imageSrc) : altImg} alt=''/>
                                <div className='bucket-table-row-info'>
                                    <div className='bucket-table-row-info-title'>{dish.title}</div>
                                    <div className='bucket-table-row-info-count'>
                                        <span className='custom_subtract' onClick={() => reduceDishCount(dish)}/>
                                        <input className='bucket-table-row-info-count-input' onChange={onChange(dish)}
                                               inputMode='numeric'
                                               value={getDishesKey(delivery.order, dish._id, 'count')}/>
                                        <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
                                    </div>
                                    <div
                                        className='bucket-table-row-info-ceil'>{getDishesKey(delivery.order, dish._id, 'cost') * getDishesKey(delivery.order, dish._id, 'count') + ' ₽'}</div>
                                </div>
                                <div><span className='bucket-table-row-remove custom_close'
                                           onClick={() => removeDish(dish._id)}/></div>
                            </div>
                        ))}
                        {!!dishes.length && <div>
                            <Button variant='contained' color='secondary' onClick={() => clearBucket()}>Очистить
                                корзину</Button>
                            <LinkButton to='/menu' label='Дозаказать' variant='contained' color='secondary' />
                        </div>}

                        <SaucesBlock sauces={sauces} addDishToBucket={addDishToBucket} />

                        {!!delivery.order.length && <div>
                            <div>Сумма заказа: {orderPrice} ₽</div>
                            <div>
                                {
                                    saleForPickup === 0
                                        ? `Стоимость доставки: ${deliveryPrice} ₽`
                                        : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
                                }
                            </div>
                            <div>Итого: {price} ₽</div>
                            <Button variant='contained' color='primary' onClick={() => setStep(1)}>Оформить заказ</Button>
                        </div>}
                    </div>*/}

                    {/*                    <div className='bucket-order'>
                        <h3 className='bucket-order-title'>Оформление заказа</h3>
                        <FormOrder settings={settings}
                                   global_settings={global_settings}
                                   payment_method={paymentMethod}
                                   delivery_method={deliveryMethod}
                                   onSubmit={onSubmit}/>
                    </div>*/}

                </> : <div>Ваша корзина пуста. Назад в <Link to='/menu'>меню</Link>.</div>}
        </div>
    )
};

export default Bucket;