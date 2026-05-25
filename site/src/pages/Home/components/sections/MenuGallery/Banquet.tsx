import React from 'react'
import Gallery from './Gallery';
import menuImg from '@/static/img/menu.webp'

const { hostname } = window.location
const images = [
  `//${hostname}/uploads/banquet-0001.webp`,
  `//${hostname}/uploads/banquet-0002.webp`,
  `//${hostname}/uploads/banquet-0003.webp`,
  `//${hostname}/uploads/banquet-0004.webp`,
  `//${hostname}/uploads/banquet-0005.webp`,
  `//${hostname}/uploads/banquet-0006.webp`,
  `//${hostname}/uploads/banquet-0007.webp`,
  `//${hostname}/uploads/banquet-0008.webp`,
  `//${hostname}/uploads/banquet-0009.webp`,
  `//${hostname}/uploads/banquet-0010.webp`
];

const BanquetGallery = () => <Gallery images={images} backgroundImage={menuImg} />;

export default BanquetGallery