export class RequiredError extends Error {
  constructor(field: string) {
    super(`Field is required: ${field}`)
  }
}
