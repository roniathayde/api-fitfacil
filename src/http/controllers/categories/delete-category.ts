import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CategoryRepository } from '@/repositories/category-repository'
import { GenericCategoryError } from '@/use-cases/errors/create-category-error'
import { DeleteCategoryUseCase } from '@/use-cases/categories/delete-category-use-case'

export async function deleteCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteCategoryParamsSchema = z.object({
      categoryId: z.string(),
    })

    const { categoryId } = deleteCategoryParamsSchema.parse(request.params)

    const categoryRepository = new CategoryRepository()
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

    await deleteCategoryUseCase.execute(categoryId)

    return reply.status(201).send({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    if (error instanceof GenericCategoryError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
