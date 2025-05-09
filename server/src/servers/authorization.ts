import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from '../routes/auth';
import authLocal from '../lib/auth/auth-local';
import sessionMiddleware from '../middleware/session';

/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/

export default () => {
  const app = express()

  app.use(cookieParser(process.env.SECRET))

  passport.serializeUser((user: any, done: any) => done(null, user))
  passport.deserializeUser((obj: any, done: any) => {
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
  process.on('unhandledRejection', console.error)

  const server = app.listen(process.env.AUTHORIZATION_PORT || 9092, () => {
    // @ts-ignore
    console.log(`Authorization app listening at ${server.address()!.port.toString()}`)
  })

  return app
}
