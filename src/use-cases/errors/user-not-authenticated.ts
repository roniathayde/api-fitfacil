export class UserNotAuthenticated extends Error {
  constructor() {
    super('Usuário não autenticado. Faça login novamente.')
  }
  static statusCode = 404
}
