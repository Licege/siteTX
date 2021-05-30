import React from 'react'
import CardPdf from '../../../components/Cards/CardPdf'
import menuImg from '../../../static/img/menu.jpg'
// @ts-ignore
import pdfMenuDishes from '../../../temp/tri_holma_menu.pdf'

const PDFMenu = () => <CardPdf imageSrc={menuImg} pdfSrc={pdfMenuDishes} />

export default PDFMenu