import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { SignInUserUseCase } from '@/use-cases/users/auth/sign-in-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const sigInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signInUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = sigInBodySchema.parse(request.body)
    const userRepository = new UsersRepository()
    const signInUserUseCase = new SignInUserUseCase(userRepository)

    const { user } = await signInUserUseCase.execute({ email, password })
    const DATE_NOW = dayjs()
    const CURRENT_DATE_PLUS_7_DAYS = DATE_NOW.add(7, 'day')

    const jwtToken = jwt.sign(
      {
        sub: user.id,
      },
      env.JWT_SECRET_KEY,
      {
        expiresIn: '10m',
      },
    )

    return reply
      .setCookie('auth', jwtToken, {
        path: '/',
        httpOnly: true,
        expires: CURRENT_DATE_PLUS_7_DAYS.toDate(),
      })
      .status(200)
      .send({
        jwtToken,
      })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: 'E-mail já cadastrado' })
    }
    throw error
  }
}
