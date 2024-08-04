export class InviteExpiredError extends Error {
  constructor() {
    super('O convite atual foi expirado.')
  }
}
