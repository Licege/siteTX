// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'passport'.
const passport = require('passport')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'LocalStrat... Remove this comment to see the full error message
const LocalStrategy = require('passport-local').Strategy
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bodyParser... Remove this comment to see the full error message
const bodyParser = require('body-parser')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'cookiePars... Remove this comment to see the full error message
const cookieParser = require('cookie-parser')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require('../routes/routes')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authLocal'... Remove this comment to see the full error message
const authLocal = require('../lib/auth/auth-local')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sessionMid... Remove this comment to see the full error message
const sessionMiddleware = require('../middleware/session')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const start = () => {
  const app = express()

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  app.use(cookieParser(process.env.SECRET))

  const options = {
    setHeaders: (res: any) => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'GET')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
    }
  }
  app.use('/uploads', express.static('uploads', options))

  passport.serializeUser((user: any, done: any) => done(null, user))
  passport.deserializeUser((obj: any, done: any) => done(null, obj))

  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(
    bodyParser.json({
      limit: '10mb',
      type: [
        'json',
        'application/csp-report',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        'application/x-www-form-urlencoded'
      ]
    })
  )

  passport.use(
    'user-strategy',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      authLocal
    )
  )

  const session = sessionMiddleware({ rolling: true })

  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api/private/*', ensureAuthenticated)

  app.use(router())

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error TS(2304): Cannot find name '__dirname'.
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req: any, res: any) => {
      // @ts-expect-error TS(2304): Cannot find name '__dirname'.
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
  }

  app.use((err: any, res: any) => {
    if (err.name === 'Error') {
      console.error(err)
      return res.status(409).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Internal server error' })
  })
  app.use((req: any, res: any) => {
    res.status(404).json({ msg: 'Not found' })
  })
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  process.on('unhandledRejection', console.error)

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const server = app.listen(process.env.SERVICE_PORT || 9090, () => {
    console.log(`Service app listening at ${server.address().port}`)
  })

  return app
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = start
