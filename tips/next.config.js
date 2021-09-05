module.exports = {
  images: {
    domains: [process.env.API_IMAGES_URL]
  },
  env: {
    MIN_TIP_AMOUNT: 10,
    MAX_TIP_AMOUNT: 15000,
    TIP_COMMISSION_PERCENT: 5
  }
}