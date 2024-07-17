import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createUserController } from '../auth/create-user'
import { signInUserController } from '../auth/sign-in'
import { verifyJwt } from '../middlewares/verify-user-session'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', createUserController)

  app.post('/auth', signInUserController)
  app.get(
    '/test',
    { onRequest: verifyJwt },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.status(200).send({ message: 'passou' })
    },
  )
}
