import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-user-session'
import { createCategoryController } from './create-category'
import { getCategoryByIdController } from './get-category-by-id'
import { updateCategoryController } from './update-category'
import { deleteCategoryController } from './delete-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/category/:trainId', createCategoryController)
  app.get('/category/:categoryId', getCategoryByIdController)
  app.put('/category/:categoryId', updateCategoryController)
  app.delete('/category/:categoryId', deleteCategoryController)
}
