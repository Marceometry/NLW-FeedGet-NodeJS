export class RequiredError extends Error {
  public statusCode = 400

  constructor(field: string) {
    super(`Field is required: ${field}`)
  }
}
