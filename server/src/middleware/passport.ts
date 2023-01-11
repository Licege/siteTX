// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JwtStrateg... Remove this comment to see the full error message
const JwtStrategy = require('passport-jwt').Strategy
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ExtractJwt... Remove this comment to see the full error message
const ExtractJwt = require('passport-jwt').ExtractJwt
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'keys'.
const keys = require('../../config/keys')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'options'.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (passport: any) => {
  passport.use(
    'simple-jwt',
    // @ts-expect-error TS(2705): An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
    new JwtStrategy(options, async (payload: any, done: any) => {
      try {
        done(null, payload.userId)
        /*const user = await User.findById(payload.userId).select('email id')

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }*/
      } catch (e) {
        console.log(e)
      }
    })
  )
}
