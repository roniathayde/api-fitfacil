import { TrainsRepository } from '@/repositories/trains-repository'
import { CreateTrainUseCase } from '@/use-cases/trains/create-trains-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserPayload } from '../middlewares/verify-user-session'

export async function createTrainController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createTrainBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      scheduled_to: z.string(),
      duration_in_sec: z.string(),
      difficulty: z.enum(['FACIL', 'MEDIO', 'DIFICIL']),
    })

    const { title, description, scheduled_to, duration_in_sec, difficulty } =
      createTrainBodySchema.parse(request.body)

    const user = request.user as UserPayload
    const userId = user.sub

    const trainsRepository = new TrainsRepository()
    const createTrainUseCase = new CreateTrainUseCase(trainsRepository)

    await createTrainUseCase.execute(
      {
        title,
        description,
        scheduled_to,
        duration_in_sec,
        difficulty,
      },
      userId,
    )

    return reply.status(201).send({ message: 'Treino criado com sucesso' })
  } catch (error) {
    return reply
      .status(400)
      .send({ message: 'Ocorreu um erro ao criar o treino' })
  }
}
