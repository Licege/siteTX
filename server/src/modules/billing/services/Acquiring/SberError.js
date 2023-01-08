class SberError extends Error {
  constructor({ errorMessage, sberErrorCode }) {
    super(errorMessage);

    this.name = 'SberError';
    this.message = errorMessage;
    this.code = sberErrorCode;
  }
}

exports.SberError = SberError;
