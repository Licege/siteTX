// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SberError'... Remove this comment to see the full error message
class SberError extends Error {
  code: any;
  constructor({
    errorMessage,
    sberErrorCode
  }: any) {
    super(errorMessage)

    this.name = 'SberError'
    this.message = errorMessage
    this.code = sberErrorCode
  }
}

exports.SberError = SberError
