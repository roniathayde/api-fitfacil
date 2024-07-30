import { CreateCategoryUseCase } from '@/use-cases/categories/create-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CategoryRepository } from '@/repositories/category-repository'
import { GenericCategoryError } from '@/use-cases/errors/create-category-error'

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createCategoryBodySchema = z.object({
      name: z.string(),
    })

    const createCategoryParamsSchema = z.object({
      trainId: z.string(),
    })

    const data = createCategoryBodySchema.parse(request.body)
    const { trainId } = createCategoryParamsSchema.parse(request.params)

    const categoryRepository = new CategoryRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

    await createCategoryUseCase.execute(data, trainId)

    return reply.status(201).send({ message: 'Categoria criada com sucesso' })
  } catch (error) {
    if (error instanceof GenericCategoryError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
