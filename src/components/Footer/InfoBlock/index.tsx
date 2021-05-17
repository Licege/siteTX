import React from 'react'
import WorkTime from './WorkTime'
import SocialNetworks from './SocialNetworks'
import { InfoBlockContainer } from '../styles'

const InfoBlock = () => (
  <InfoBlockContainer>
    <WorkTime />
    <SocialNetworks />
  </InfoBlockContainer>
)

export default InfoBlock