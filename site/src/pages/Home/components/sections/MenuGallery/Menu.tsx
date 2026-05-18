import React from 'react'
import menuImg from '@/static/img/menu-v2.webp'
import Gallery from './Gallery';

const { hostname } = window.location
const images = [
  `//${hostname}/uploads/menu-0001.webp`,
  `//${hostname}/uploads/menu-0002.webp`,
  `//${hostname}/uploads/menu-0003.webp`,
  `//${hostname}/uploads/menu-0004.webp`,
  `//${hostname}/uploads/menu-0005.webp`,
  `//${hostname}/uploads/menu-0006.webp`,
  `//${hostname}/uploads/menu-0007.webp`,
  `//${hostname}/uploads/menu-0008.webp`,
  `//${hostname}/uploads/menu-0009.webp`
];

const MenuGallery = () => <Gallery images={images} backgroundImage={menuImg} />


export default MenuGallery