import { TrainsRepository } from '@/repositories/trains-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { GetTrainByIdUseCase } from '@/use-cases/trains/get-train-by-id-use-case'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

export async function getTrainController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getTrainParamsSchema = z.object({
      trainId: z.string(),
    })

    const { trainId } = getTrainParamsSchema.parse(request.params)

    const trainsRepository = new TrainsRepository()
    const getTrainByIdUseCase = new GetTrainByIdUseCase(trainsRepository)

    const trains = await getTrainByIdUseCase.execute(trainId)

    return reply.status(201).send(trains)
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ message: 'Treino não encontrado' })
    }

    throw error
  }
}
