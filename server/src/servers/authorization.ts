const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRouter = require('../routes/auth')

const authLocal = require('../lib/auth/auth-local')
const sessionMiddleware = require('../middleware/session')
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/

const start = () => {
  const app = express()

  app.use(cookieParser(process.env.SECRET))

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((obj, done) => {
    console.log('obj', obj)
    done(null, obj)
  })

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

  app.use((err, res, next) => {
    if (err.name === 'Error') {
      console.error(err)
      return res.status(409).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Internal server error' })
  })
  app.use((req, res) => {
    res.status(404).json({ msg: 'Not found' })
  })
  process.on('unhandledRejection', console.error)

  const server = app.listen(process.env.AUTHORIZATION_PORT || 9092, () => {
    console.log(`Authorization app listening at ${server.address().port}`)
  })

  return app
}

module.exports = start
