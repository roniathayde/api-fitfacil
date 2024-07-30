import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-user-session'
import { createCategoryController } from './create-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/category/:trainId', createCategoryController)
}
