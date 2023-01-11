// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const AuthenticationError = require('./auth-error')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'comparePas... Remove this comment to see the full error message
const { comparePassword } = require('./password')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'UserRepo'.
const UserRepo = require('../../repositories/user')

let loginFailCount = 0

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authLocal'... Remove this comment to see the full error message
const authLocal = async (req: any, email: any, password: any, done: any) => {
  const antibot = req.body && req.body.name
  try {
    if (antibot) {
      return setTimeout(
        () => done(new AuthenticationError(401, 'The password is not correct')),
        30000
      )
    }

    const user = await UserRepo.one({ email })
    if (!user) {
      return done(new AuthenticationError(401, 'This email is not registered'))
    }

    // @ts-expect-error TS(2585): 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    const [passwordMatch] = await Promise.all([
      comparePassword(password, user.password)
    ])
    if (!passwordMatch) {
      loginFailCount += 1
    }
    if (loginFailCount === 3) {
      console.log('Нужно отправить сообщение на email о подборе пароля')
    }
    if (!passwordMatch) {
      return done(new AuthenticationError(401, 'The password is not correct'))
    }
    if (false) {
      return done(new AuthenticationError(401, 'User blocked'))
    }
    const plainUser = user
    delete plainUser.password
    plainUser.entity = {
      id: user.id,
      forename: user.forename,
      surname: user.surname,
      type: 'User'
    }
    return done(null, plainUser)
  } catch (err) {
    return done(err)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = authLocal
