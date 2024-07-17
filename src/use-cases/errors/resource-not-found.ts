export class ResourceNotFound extends Error {
  constructor() {
    super('Não encontrado.')
  }
  static statusCode = 404
}
