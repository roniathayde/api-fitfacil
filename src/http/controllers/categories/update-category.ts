import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CategoryRepository } from '@/repositories/category-repository'
import { GenericCategoryError } from '@/use-cases/errors/create-category-error'
import { UpdateCategoryUseCase } from '@/use-cases/categories/update-category-use-case'

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateCategoryBodySchema = z.object({
      name: z.string(),
    })

    const updateCategoryParamsSchema = z.object({
      categoryId: z.string(),
    })

    const { name } = updateCategoryBodySchema.parse(request.body)
    const { categoryId } = updateCategoryParamsSchema.parse(request.params)

    const categoryRepository = new CategoryRepository()
    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)

    const { category } = await updateCategoryUseCase.execute(
      { name },
      categoryId,
    )

    return reply.status(201).send({ category })
  } catch (error) {
    if (error instanceof GenericCategoryError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
