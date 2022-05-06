export class GenericError extends Error {
  constructor(message: string) {
    super(message || 'Unexpected error occurred, please try again later!')
  }
}
