import express from 'express';
import passport from 'passport';
// @ts-ignore
import RateLimit from 'express-rate-limit';
import * as authController from '../controllers/auth';

const router = express.Router();

const rateLimit = new RateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
})

export default () => {
  router
    .post(
      '/api/auth/login',
      rateLimit,
      passport.authenticate('user-strategy'),
      authController.login
    )
    .use('/api/auth/logout', authController.logout)
    .post('/api/auth/registration', authController.register)

  return router
}
