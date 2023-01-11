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
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const authRouter = require('../routes/auth')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authLocal'... Remove this comment to see the full error message
const authLocal = require('../lib/auth/auth-local')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sessionMid... Remove this comment to see the full error message
const sessionMiddleware = require('../middleware/session')
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const start = () => {
  const app = express()

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  app.use(cookieParser(process.env.SECRET))

  passport.serializeUser((user: any, done: any) => done(null, user))
  passport.deserializeUser((obj: any, done: any) => {
    console.log('obj', obj)
    done(null, obj)
  })

  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  app.use(require('morgan')('dev'))
  app.use('/uploads', express.static('uploads'))
  app.use(bodyParser.urlencoded({ extended: true }))
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

  const session = sessionMiddleware({
    resave: false,
    saveUninitialized: true,
    rolling: true
  })

  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(authRouter())

  app.use((err: any, res: any, next: any) => {
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
  const server = app.listen(process.env.AUTHORIZATION_PORT || 9092, () => {
    console.log(`Authorization app listening at ${server.address().port}`)
  })

  return app
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = start
