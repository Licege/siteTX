class CustomError extends Error {
  constructor(message, { type = 'custom' } = {}) {
    super(message)
    this.type = type
    this.message = message
  }
}

exports.isCustomError = (error) => error.type === 'custom'

exports.CustomError = CustomError
