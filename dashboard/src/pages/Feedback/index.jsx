import React from "react";
import { Page } from "../../components/common/Page";
import { tableConfig } from './config';
import { useFeedbackLogic } from './logic'
import Table from '../../components/UI/Table'

const Feedback = () => {
  const { complains } = useFeedbackLogic();
  console.log(complains);
  return (
    <Page title='Обратная связь'>
      <Table data={complains} columns={tableConfig.columns} {...tableConfig.options} />
    </Page>
  )
}

export default Feedback