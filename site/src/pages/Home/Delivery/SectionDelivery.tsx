import React from 'react'
import { contactsType } from '../../../types/types'
import { SectionSubtitle, SectionTitle } from '../../../components/core'
import { Body, DignityBlock, DignityItem, Image, MenuLink, OrderBlock, Phone, Wrapper } from './styles'

interface IProps {
  contacts: contactsType
}

const SectionDelivery: React.FC<IProps> = ({ contacts }) => (
  <Wrapper>
    <SectionTitle>Условия доставки</SectionTitle>
    <SectionSubtitle noMargin>Все об оплате и получении заказа</SectionSubtitle>
    <OrderBlock>
      Заказ блюд по телефону:
      <Phone href={`tel:${contacts.phone}`}> {contacts.phone} </Phone>
      или на
      <MenuLink to="/menu"> сайте</MenuLink>
    </OrderBlock>
    <Body>
      <Image />
      <DignityBlock>
        <DignityItem>Минимальная сумма заказа от</DignityItem>
        <DignityItem>Бесплатная доставка от</DignityItem>
        <DignityItem>Доставка с X до Y</DignityItem>
        <DignityItem>Оплата наличными</DignityItem>
      </DignityBlock>
    </Body>
  </Wrapper>
)

export default SectionDelivery
