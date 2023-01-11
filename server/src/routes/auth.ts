// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require('express').Router()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'passport'.
const passport = require('passport')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const RateLimit = require('express-rate-limit')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'auth'.
const auth = require('../controllers/auth')

const rateLimit = new RateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
})

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = () => {
  router
    .post(
      '/api/auth/login',
      rateLimit,
      passport.authenticate('user-strategy'),
      auth.login
    )
    .use('/api/auth/logout', auth.logout)
    .post('/api/auth/registration', auth.register)

  return router
}
