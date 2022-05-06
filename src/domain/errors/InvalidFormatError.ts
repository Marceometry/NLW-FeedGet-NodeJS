export class InvalidFormatError extends Error {
  constructor(field: string) {
    super(`Field with invalid format: ${field}`)
  }
}
