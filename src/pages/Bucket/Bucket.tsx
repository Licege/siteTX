import React from 'react'
import { Link } from 'react-router-dom'
import {
    categoryType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost, profileType,
} from '../../types/types'
import FormOrder from './FormOrder'
import { Breadcrumbs, Chip, Theme, withStyles } from '@material-ui/core'
import { ShowOrder } from './ShowOrder'
import { FinishOrder } from './FinishOrder'
import { getFullName } from '../../plugins/helpers';

type PropsType = {
    me: profileType
    dishes: Array<dishType>
    menu: Array<dishType>
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
    settings: Array<deliverySettingsType>
    globalSettings: deliveryGlobalSettingsType
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
    removeDish: (id: number | string) => void
    clearBucket: () => void
    onSubmit: (data: IDeliveryPost) => void
    onChange: (dish: dishType) => ((event: React.ChangeEvent<HTMLInputElement>) => void)
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
            outline: 'none',
        },
    },
}))(Chip) as typeof Chip

const defaultTimeDelivery = new Date(new Date().setMilliseconds(60 * 60 * 1000))

const getDataFromProfile = (me: profileType) => {
    if (!me || !Object.keys(me).length) return {}
    const { surname, forename, patronymic, phone, email } = me

    return {
        name: getFullName({ surname, forename, patronymic }),
        phone,
        email
    }
}

const getInitialValues = (me: profileType) => {
    const initialValues = {
        paymentType: 'cash',
        deliveryType: 'home',
        address: {
            city: 'Калининград',
        },
        timeDelivery: defaultTimeDelivery,
    }

    return { ...getDataFromProfile(me), ...initialValues }
}

const Bucket: React.FC<PropsType> = (props) => {
    const {
        me, dishes, menu, step, delivery, deliveryPrice, settings, globalSettings, paymentMethod, deliveryMethod,
        isDisabled, increaseDishCount, reduceDishCount, removeDish, clearBucket, onSubmit, onChange, saleForPickup,
        addDishToBucket, categories, setStep, sale, price, orderStatus,
    } = props

    const sauceCategoryId = categories.find(category => category.title === ('Соус' || 'Соусы'))?.id
    const sauces = menu.filter(dish => dish.categoryId === sauceCategoryId)
    const initialValues = getInitialValues(me)

    return (
        <main className='page-container'>
            {delivery.order.length ?
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
                                              categories={categories}
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

                    {step === 1 && <FormOrder initialValues={initialValues}
                                              settings={settings}
                                              globalSettings={globalSettings}
                                              paymentMethod={paymentMethod}
                                              deliveryMethod={deliveryMethod}
                                              price={price}
                                              onSubmit={onSubmit}
                                              delivery={delivery}
                                              deliveryPrice={deliveryPrice}
                                              saleForPickup={saleForPickup}
                                              sale={sale}/>}

                </> : <>
                    {step === 2
                        ? <FinishOrder orderStatus={orderStatus}/>
                        : <div>Ваша корзина пуста. Назад в <Link to='/menu'>меню</Link>.</div>
                    }
                </>
            }
        </main>
    )
}

export default Bucket
