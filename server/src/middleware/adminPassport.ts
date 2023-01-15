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
    'admin-jwt',
    new JwtStrategy(options, async (payload: any, done: any) => {
      try {
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        if (payload.userId === +process.env.ADMIN_ID) {
          done(null, payload.userId)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}