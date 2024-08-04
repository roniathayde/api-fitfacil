import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-user-session'
import { createInviteController } from './create-invite'
import { deleteInviteController } from './delete-invite'

export async function inviteRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/invite/:trainId/:userId', createInviteController)
  app.delete('/invite/:trainId', deleteInviteController)
}
