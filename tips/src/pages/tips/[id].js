import {useCallback, useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "../../components/Image";
import classes from '../../styles/tip.module.css'
import MainLayout from "../../components/MainLayout";
import {Block, BlockWithLabel} from "../../components/Block";
import BlockAmount from "../../components/BlockAmount";
import Rating from "../../components/rating";


function generateSubmitButtonText(amount, isPaidCommission, commission) {
  let sum = amount

  if (isPaidCommission) {
    sum += commission
  }

  return `Оплатить · ${sum} ₽`
}

function generateReviewActionText(isShowReview) {
  return isShowReview ? 'Убрать отзыв' : 'Оставить отзыв'
}

function calcCommission(value) {
  return Math.round(process.env.TIP_COMMISSION_PERCENT / 100 * value)
}


const EmployeeTip = ({ employee }) => {
  const router = useRouter()
  const [amount, setAmount] = useState(200)
  const [isPaidCommission, setIsPaidCommission] = useState(true)
  const [commission, setCommission] = useState(calcCommission(amount))
  const [rating, setRating] = useState(0)
  const [isShowReview, setIsShowReview] = useState(true)
  const [review, setReview] = useState('')

  useEffect(() => {
    setCommission(calcCommission(amount))
  }, [amount])

  const redirectToTipsPage = useCallback(() => {
    router.push('/')
  }, [])

  const toggleIsPaidCommission = () => setIsPaidCommission(prev => !prev);

  const toggleIsShowReview = () => setIsShowReview(prev => !prev);

  const changeRating = newRating => {
    setRating(newRating);
  }

  const submit = () => {
    const result = { employeeId: employee.id, amount, isPaidCommission, commission };

    if (isShowReview && review) {
      result.text = review;
    }

    if (rating) {
      result.rating = rating;
    }

    console.log(result);
  }

  const onChangeReview = ({ target: { value } }) => {
    setReview(value);
  }

  return (
    <MainLayout title={employee.name}>
      <div className={classes.tip}>
        <BlockWithLabel className={classes.about}
                        label="Cотрудник"
                        actionText="Выбрать другого сотрудника"
                        onClickAction={redirectToTipsPage}
                        >
          <div className={classes.avatar__wrapper}>
            <Image className={classes.avatar} src={employee.imageSrc} alt="" />
          </div>
          <div className={classes.about__name}>{employee.name}</div>
        </BlockWithLabel>

        <BlockAmount value={amount} onChange={setAmount} />

        <BlockWithLabel label="Оценка"
                        actionText={generateReviewActionText(isShowReview)}
                        onClickAction={toggleIsShowReview}
        >
          <div className={classes['mark-block']}>
            <Rating stars={5} size={40} value={rating} onClick={changeRating} />
            {isShowReview && <textarea className={classes.review}
                                       value={review}
                                       onChange={onChangeReview}
                                       placeholder="Можно оставить отзыв здесь..."
                                       rows={10}/>
            }
          </div>
        </BlockWithLabel>

        <Block>
          <label className={classes.checkbox}>
            <input type="checkbox" checked={isPaidCommission} onChange={toggleIsPaidCommission}/>
            Оплатить комиссию (+{commission} ₽), чтобы сотрудник получил указанную сумму в полном размере.
          </label>
          <button className={classes['submit-button']} onClick={submit}>
            {generateSubmitButtonText(amount, isPaidCommission, commission)}
          </button>
        </Block>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`${process.env.API_URL}/employees/${query.id}`)
  const employee = await response.json()

  return {
    props: { employee }
  }
}

export default EmployeeTip