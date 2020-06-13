import React from 'react';
import {
    categoryType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost
} from "../../types/types";
import FormOrder from "./FormOrder";
import {Breadcrumbs, Chip, Theme, withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import {ShowOrder} from "./ShowOrder";
import {FinishOrder} from "./FinishOrder";

type PropsType = {
    dishes: Array<dishType>
    menu: Array<dishType>
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    paymentMethod: string
    deliveryMethod: string
    categories: Array<categoryType>
    step: 0 | 1 | 2
    sale: number
    price: number
    orderStatus: string

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
        }
    }
}))(Chip) as typeof Chip;

const Bucket: React.FC<PropsType> = (props) => {
    const {
        dishes, menu, step, delivery, deliveryPrice, settings, global_settings, paymentMethod, deliveryMethod, isDisabled,
        increaseDishCount, reduceDishCount, removeDish, clearBucket, onSubmit, onChange, saleForPickup, addDishToBucket, categories, setStep,
        sale, price, orderStatus
    } = props;

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
                                              onSubmit={onSubmit}
                                              delivery={delivery}
                                              deliveryPrice={deliveryPrice}
                                              saleForPickup={saleForPickup}
                                              sale={sale} />}

                    {step === 2 && <FinishOrder orderStatus={orderStatus} />}

                </> : <div>Ваша корзина пуста. Назад в <Link to='/menu'>меню</Link>.</div>}
        </div>
    )
};

export default Bucket;