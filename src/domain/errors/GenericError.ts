export class GenericError extends Error {
  public statusCode = 500

  constructor(message: string) {
    super(message || 'Unexpected error occurred, please try again later!')
  }
}
