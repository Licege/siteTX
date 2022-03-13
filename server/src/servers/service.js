const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const router = require('../routes/routes')

const authLocal = require('../lib/auth/auth-local')
const sessionMiddleware = require('../middleware/session')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const start = () => {
  const app = express()

  app.use(cookieParser(process.env.SECRET))

  const options = {
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'GET')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
    }
  }
  app.use('/uploads', express.static('uploads', options))

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(bodyParser.json({
    limit: '10mb',
    type: [
      'json',
      'application/csp-report',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
      'application/x-www-form-urlencoded'
    ]
  }))

  passport.use(
    'user-strategy',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      authLocal
    ),
  )

  const session = sessionMiddleware({ rolling: true })

  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api/private/*', ensureAuthenticated)

  app.use(router())

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
  }

  app.use((err, res) => {
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

  const server = app.listen(process.env.SERVICE_PORT || 9090, () => {
    console.log(`Service app listening at ${server.address().port}`)
  })

  return app
}

module.exports = start
