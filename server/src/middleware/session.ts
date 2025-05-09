import session from 'express-session';
import connectSequelizeStore from 'connect-session-sequelize';
import models from '../models';

const { sequelize } = models;
const SequelizeStore = connectSequelizeStore(session.Store);

const { TRIXOLMA_BASE_DOMAIN, SECRET, COOKIE_MAX_AGE } =
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

export default ({
  resave = true,
  saveUninitialized = false,
  rolling = true
} = {}) =>
  session({
    secret: SECRET ?? '',
    store: sequeliseStore(),
    resave,
    saveUninitialized,
    // key: TRIXOLMA_SID,
    rolling,
    cookie: {
      maxAge: COOKIE_MAX_AGE === 'null' ? oneDay : oneDay,
      domain: TRIXOLMA_BASE_DOMAIN,
      // sameSite: 'none',
      expires: new Date(Date.now() + oneDay),
      // originalMaxAge: oneDay
    },
  })
