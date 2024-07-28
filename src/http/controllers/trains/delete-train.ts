import { TrainsRepository } from '@/repositories/trains-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { DeleteTrainUseCase } from '@/use-cases/trains/delete-train-use-case'

export async function deleteTrainController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getTrainParamsSchema = z.object({
      trainId: z.string(),
    })

    const { trainId } = getTrainParamsSchema.parse(request.params)

    const trainsRepository = new TrainsRepository()
    const deleteTrainUseCase = new DeleteTrainUseCase(trainsRepository)

    await deleteTrainUseCase.execute(trainId)

    return reply.status(201).send({ message: 'Treino deletado com sucesso' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ message: 'Treino não encontrado' })
    }
    console.log('error', error)

    throw error
  }
}
