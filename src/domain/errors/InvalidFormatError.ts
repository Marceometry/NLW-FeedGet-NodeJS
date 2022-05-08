export class InvalidFormatError extends Error {
  public statusCode = 400

  constructor(field: string) {
    super(`Field with invalid format: ${field}`)
  }
}
