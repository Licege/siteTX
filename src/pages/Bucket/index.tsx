import React from 'react'
import { Link } from 'react-router-dom'
import FormOrder from './formOrder'
import ShowOrder from './showOrder'
import FinishOrder from './FinishOrder'
import BucketBreadcrumbs from './Breadcrumbs'
import { useBucketPageLogic } from './logic'


const Bucket = () => {
    const { haveOrder, step, setStep } = useBucketPageLogic()

    return (
        <main className='page-container'>
            {haveOrder ?
                <>
                    <BucketBreadcrumbs step={step} setStep={setStep} />

                    {step === 0 && <ShowOrder setStep={setStep}/>}

                    {step === 1 && <FormOrder />}

                </> : <>
                    {step === 2
                        ? <FinishOrder />
                        : <div>Ваша корзина пуста. Назад в <Link to='/menu'>меню</Link>.</div>
                    }
                </>
            }
        </main>
    )
}

export default Bucket
