import React from 'react'
import Gallery from './Gallery';
import menuImg from '../../../static/img/menu-v2.jpeg'

const { hostname } = window.location
const images = [
  `//${hostname}/uploads/0001.webp`,
  `//${hostname}/uploads/0002.webp`,
  `//${hostname}/uploads/0003.webp`,
  `//${hostname}/uploads/0004.webp`,
  `//${hostname}/uploads/0005.webp`,
  `//${hostname}/uploads/0006.webp`,
  `//${hostname}/uploads/0007.webp`,
  `//${hostname}/uploads/0008.webp`,
  `//${hostname}/uploads/0009.webp`,
  `//${hostname}/uploads/0010.webp`,
  `//${hostname}/uploads/0011.webp`,
  `//${hostname}/uploads/0012.webp`,
  `//${hostname}/uploads/0013.webp`,
  `//${hostname}/uploads/0032.webp`
];

const MenuGallery = () => <Gallery images={images} backgroundImage={menuImg} />


export default MenuGallery