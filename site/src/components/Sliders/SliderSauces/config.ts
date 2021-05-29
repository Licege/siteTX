function getCountSlidesToShow(countToShow: number, countItems: number) {
  return countToShow > countItems ? countItems : countToShow
}

function makeConfig(countSauces: number) {
  return {
    dots: false,
    slidesToShow: getCountSlidesToShow(3, countSauces),
    initialSlide: 1,
    centerMode: false,
    centerPadding: '30px',
    autoplay: false,
    arrows: true,

    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: getCountSlidesToShow(2, countSauces),
          initialSlide: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          initialSlide: getCountSlidesToShow(2, countSauces),
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
}

export default makeConfig;