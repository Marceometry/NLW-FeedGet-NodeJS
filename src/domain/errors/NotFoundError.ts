export class NotFoundError extends Error {
  public statusCode = 404

  constructor(field: string) {
    super(`${field} not found`)
  }
}
