import { TrainsRepository } from '@/repositories/trains-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { CreateTrainUseCase } from '@/use-cases/trains/create-trains-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createTrainBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  scheduled_to: z.string(),
  duration_in_sec: z.string(),
  difficulty: z.enum(['FACIL', 'MEDIO', 'DIFICIL']),
})

export async function createTrainController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { title, description, scheduled_to, duration_in_sec, difficulty } =
      createTrainBodySchema.parse(request.body)
    const { sub } = request.user
    const trainsRepository = new TrainsRepository()
    const createTrainUseCase = new CreateTrainUseCase(trainsRepository)

    console.log(request.user)
    if (!sub) {
      return reply.status(400).send({ message: 'Erro de autenticação' })
    }

    await createTrainUseCase.execute(
      {
        title,
        description,
        scheduled_to,
        duration_in_sec,
        difficulty,
      },
      sub,
    )

    return reply.status(201).send({ message: 'usuário criado' })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: 'E-mail já cadastrado' })
    }
    throw error
  }
}
