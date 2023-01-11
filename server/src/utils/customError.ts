// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CustomErro... Remove this comment to see the full error message
class CustomError extends Error {
  type: any;
  constructor(message: any, { type = 'custom' } = {}) {
    super(message)
    this.type = type
    this.message = message
  }
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.isCustomError = (error: any) => error.type === 'custom'

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.CustomError = CustomError
