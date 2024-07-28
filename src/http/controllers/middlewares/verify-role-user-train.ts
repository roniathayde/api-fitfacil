import { UserTrainsRepository } from '@/repositories/user-trains-repository'
import { FindUserRoleInTrain } from '@/use-cases/user-trains/find-user-role-in-train'
import { Role } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserPayload } from './verify-user-session'
import { z } from 'zod'
import { TrainPermissionDenied } from '@/use-cases/errors/train-permission-denied'
import { TrainRelationshipNotFound } from '@/use-cases/errors/train-relationship-not-found'

const TrainParamsSchema = z.object({
  trainId: z.string().uuid(),
})

export function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as UserPayload // Isso ajuda o TypeScript a entender o tipo
      const sub = user.sub

      const { trainId } = TrainParamsSchema.parse(request.params)

      const userTrainsRepository = new UserTrainsRepository()
      const findUserRoleInTrain = new FindUserRoleInTrain(userTrainsRepository)

      if (!sub) {
        return reply.status(400).send({
          message: 'Usuário não autenticado',
        })
      }

      const { userTrain } = await findUserRoleInTrain.execute(
        roleToVerify,
        sub,
        trainId,
      )

      if (!userTrain) {
        return reply.status(400).send({
          message:
            'Não foi permitido efetuar a operação, somente treinadores podem editar esse treino.',
        })
      }
    } catch (error) {
      if (error instanceof TrainPermissionDenied) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      if (error instanceof TrainRelationshipNotFound) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      throw error
    }
  }
}
