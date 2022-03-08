import React from 'react'
import { Helmet } from 'react-helmet';
import ResumeForm from './ResumeForm'
import { PageContainer, PageTitle } from '../../../components/core'
import { useResumePageLogic } from './logic'


const Resume = () => {
  const { initialValues, postResume } = useResumePageLogic()

  return (
    <PageContainer>
      <Helmet title='Резюме' />
      <PageTitle>Резюме</PageTitle>
      <div>
        <ResumeForm onSubmit={postResume} initialValues={initialValues} />
      </div>
    </PageContainer>
  )
}

export default Resume
