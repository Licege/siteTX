// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bcrypt'.
const bcrypt = require('bcryptjs')

// @ts-expect-error TS(2585): 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
const hashPassword = (password: any) => new Promise((resolve: any, reject: any) => {
  bcrypt.genSalt(10, (saltError: any, salt: any) => {
    if (saltError) reject(saltError)
    bcrypt.hash(password, salt, null, (hashError: any, hash: any) =>
      hashError ? reject(hashError) : resolve(hash)
    )
  })
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'comparePas... Remove this comment to see the full error message
const comparePassword = (candidatePassword: any, password: any) =>
  // @ts-expect-error TS(2585): 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
  new Promise((resolve: any, reject: any) => {
    if (!password) {
      resolve(false)
    }
    bcrypt.compare(candidatePassword, password, (error: any, isMatch: any) =>
      error ? reject(error) : resolve(isMatch)
    )
  })

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  hashPassword,
  comparePassword
}
