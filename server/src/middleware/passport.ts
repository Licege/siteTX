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

module.exports = (passport: any) => {
  passport.use(
    'simple-jwt',
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
