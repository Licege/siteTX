class AuthError extends Error {
  code: any;
  constructor(code: any, message: any) {
    super(message)
    this.name = 'AuthenticationError'
    this.code = code
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = AuthError
