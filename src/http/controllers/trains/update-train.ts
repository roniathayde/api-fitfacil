import { TrainsRepository } from '@/repositories/trains-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { UpdateTrainUseCase } from '@/use-cases/trains/update-train'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateTrainController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateTrainBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      scheduled_to: z.string().optional(),
      duration_in_sec: z.string().optional(),
      difficulty: z.enum(['FACIL', 'MEDIO', 'DIFICIL']).optional(),
    })

    const updateTrainParamsSchema = z.object({
      trainId: z.string(),
    })

    const data = updateTrainBodySchema.parse(request.body)
    const { trainId } = updateTrainParamsSchema.parse(request.params)

    const trainsRepository = new TrainsRepository()
    const updateTrainUseCase = new UpdateTrainUseCase(trainsRepository)

    const { train } = await updateTrainUseCase.execute(data, trainId)

    return reply.status(200).send({ train })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply
        .status(400)
        .send({ message: 'Não foi possível encontrar o treino' })
    }
    throw error
  }
}
