// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const session = require('express-session')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const SequelizeStore = require('connect-session-sequelize')(session.Store)
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models/index').init()

const { TRIXOLMA_SID, TRIXOLMA_BASE_DOMAIN, SECRET, COOKIE_MAX_AGE } =
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  process.env
const oneDay = 24 * 3600 * 1000

// @ts-expect-error TS(7006): Parameter 'defaults' implicitly has an 'any' type.
const extendDefaultFields = (defaults, sessionData) => ({
  data: defaults.data,
  expires: defaults.expires,

  userId:
    sessionData.passport && sessionData.passport.user
      ? sessionData.passport.user.id
      : null
})

const sequeliseStore = () =>
  new SequelizeStore({
    db: sequelize,
    table: 'Session',
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: oneDay,
    extendDefaultFields
  })

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = ({
  resave = true,
  saveUninitialized = false,
  rolling = true
} = {}) =>
  session({
    secret: SECRET,
    store: sequeliseStore(),
    resave,
    saveUninitialized,
    key: TRIXOLMA_SID,
    rolling,
    cookie: {
      maxAge: COOKIE_MAX_AGE === 'null' ? oneDay : oneDay,
      domain: TRIXOLMA_BASE_DOMAIN,
      // sameSite: 'none',
      expires: new Date(Date.now() + oneDay),
      originalMaxAge: oneDay
    },
    expires: new Date(Date.now() + oneDay)
  })
