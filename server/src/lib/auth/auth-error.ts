class AuthError extends Error {
  code: any;
  constructor(code: any, message: any) {
    super(message)
    this.name = 'AuthenticationError'
    this.code = code
  }
}

export default AuthError
