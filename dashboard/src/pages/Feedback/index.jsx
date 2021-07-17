import React from "react";
import { Page } from "../../components/common/Page";
import { useFeedbackLogic } from './logic'

const Feedback = () => {
  const { complains } = useFeedbackLogic();
  console.log(complains);
  return (
    <Page title='Обратная связь'>

    </Page>
  )
}

export default Feedback