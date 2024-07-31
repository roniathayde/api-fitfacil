import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CategoryRepository } from '@/repositories/category-repository'
import { GenericCategoryError } from '@/use-cases/errors/create-category-error'
import { GetCategoryUseCase } from '@/use-cases/categories/get-category-by-id-use-case'

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getCategoryByIdParamsSchema = z.object({
      categoryId: z.string(),
    })

    const { categoryId } = getCategoryByIdParamsSchema.parse(request.params)

    const categoryRepository = new CategoryRepository()
    const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)

    const { category } = await getCategoryUseCase.execute(categoryId)

    return reply.status(201).send({ category })
  } catch (error) {
    if (error instanceof GenericCategoryError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
