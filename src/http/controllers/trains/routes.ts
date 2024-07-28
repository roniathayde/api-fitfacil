import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-user-session'
import { createTrainController } from './create-train'
import { findTrainsByUserIdController } from './find-trains-by-user-id-controller'
import { verifyUserRole } from '../middlewares/verify-role-user-train'
import { updateTrainController } from './update-train'
import { getTrainController } from './get-train-by-id'
import { deleteTrainController } from './delete-train'

export async function trainRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/train/:trainId', getTrainController)

  app.get('/trains', findTrainsByUserIdController)

  app.post('/train', createTrainController)

  app.put(
    '/train/:trainId',
    { onRequest: [verifyUserRole('TREINADOR')] },
    updateTrainController,
  )

  app.delete(
    '/train/:trainId',
    { onRequest: [verifyUserRole('TREINADOR')] },
    deleteTrainController,
  )
}
