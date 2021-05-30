function getCountSlidesToShow(countToShow: number, countPromos: number) {
  return countToShow > countPromos ? countPromos : countToShow
}

function makeConfig(countDishes: number) {
  return {
    dots: false,
    slidesToShow: getCountSlidesToShow(5, countDishes),
    initialSlide: 1,
    centerMode: false,
    centerPadding: '30px',

    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: getCountSlidesToShow(4, countDishes),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: getCountSlidesToShow(3, countDishes),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: getCountSlidesToShow(2, countDishes),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: getCountSlidesToShow(1, countDishes),
          slidesToScroll: 1,
        },
      },
    ],
  }
}

export default makeConfig;