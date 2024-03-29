import React from 'react'
import Tour from './Tour';
import { PageTitle } from '../../components/core'

export const AboutUs: React.FC = () => (
  <section>
    <PageTitle>О нас</PageTitle>
    <p>
      Мы - семья профессионалов любящих свое дело.<br />
      Главная задача нашего ресторана - это внимательное и заботливое отношение к каждому гостю.<br />
      Кулинарное мастерство наших поваров позволит вам приятно провести время и насладиться изысканными блюдами.<br />
      Желаем вам приятного аппетита и надеемся на будущие встречи!
    </p>
    <Tour />
  </section>
)
