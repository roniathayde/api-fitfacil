import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-user-session'
import { createTrainController } from './create-train'

export async function trainRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/train', createTrainController)
}
