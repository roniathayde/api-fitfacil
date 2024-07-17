import { env } from '@/env'
import { UserNotAuthenticated } from '@/use-cases/errors/user-not-authenticated'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { auth } = request.cookies
    if (!auth) {
      throw new UserNotAuthenticated()
    }
    jwt.verify(auth, env.JWT_SECRET_KEY)
  } catch (error) {
    if (error instanceof UserNotAuthenticated) {
      return reply
        .status(UserNotAuthenticated.statusCode)
        .send({ message: error.message })
    }

    throw error
  }
}
