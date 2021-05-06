function getCountSlidesToShow(countToShow: number, countPromos: number) {
  return countToShow > countPromos ? countPromos : countToShow
}

function makeConfig(countPromos: number) {
  return {
    dots: true,
    slidesToShow: getCountSlidesToShow(3, countPromos),
    initialSlide: 1,
    centerMode: false,
    centerPadding: '30px',

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: getCountSlidesToShow(2, countPromos),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: getCountSlidesToShow(1, countPromos),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: getCountSlidesToShow(1, countPromos),
          slidesToScroll: 1,
        },
      },
    ],
  }
}

export default makeConfig;