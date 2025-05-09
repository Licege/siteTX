export class CustomError extends Error {
  type: any;
  constructor(message: any, { type = 'custom' } = {}) {
    super(message)
    this.type = type
    this.message = message
  }
}

export const isCustomError = (error: any) => error.type === 'custom'

