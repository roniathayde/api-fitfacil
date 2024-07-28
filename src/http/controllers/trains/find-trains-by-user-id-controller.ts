import { TrainsRepository } from '@/repositories/trains-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserPayload } from '../middlewares/verify-user-session'
import { FindTrainsByUserIdUseCase } from '@/use-cases/trains/find-trains-by-user-id'

export async function findTrainsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user as UserPayload
    const userId = user.sub

    const trainsRepository = new TrainsRepository()
    const findTrainsByUserIdUseCase = new FindTrainsByUserIdUseCase(
      trainsRepository,
    )

    const trains = await findTrainsByUserIdUseCase.execute(userId)

    return reply.status(201).send(trains)
  } catch (error) {
    return reply
      .status(400)
      .send({ message: 'Ocorreu um erro ao buscar os treinos' })
  }
}
