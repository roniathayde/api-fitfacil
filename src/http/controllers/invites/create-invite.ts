import { CreateInviteUseCase } from '@/use-cases/invite/create-invite-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InviteRepository } from '@/repositories/invite-repository'
import { GenericInviteError } from '@/use-cases/errors/generic-invite-error'

export async function createInviteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createInviteParamsSchema = z.object({
      trainId: z.string(),
      userId: z.string(),
    })

    const { trainId, userId } = createInviteParamsSchema.parse(request.params)

    const inviteRepository = new InviteRepository()
    const createInviteUseCase = new CreateInviteUseCase(inviteRepository)

    await createInviteUseCase.execute(trainId, userId)

    return reply.status(201).send({ message: 'Convite criado com sucesso' })
  } catch (error) {
    if (error instanceof GenericInviteError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
