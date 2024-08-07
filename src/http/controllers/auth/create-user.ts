import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { CreateUserUseCase } from '@/use-cases/users/auth/create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createBodySchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
  full_name: z.string(),
  phone_number: z.string(),
})

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, full_name, password, phone_number, username } =
      createBodySchema.parse(request.body)
    const userRepository = new UsersRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    await createUserUseCase.execute({
      email,
      full_name,
      password,
      phone_number,
      username,
    })

    return reply.status(201).send({ message: 'usuário criado' })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: 'E-mail já cadastrado' })
    }
    throw error
  }
}
