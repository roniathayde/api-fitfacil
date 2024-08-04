import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InviteRepository } from '@/repositories/invite-repository'
import { DeleteInviteUseCase } from '@/use-cases/invite/delete-invite-use-case'
import { GenericInviteError } from '@/use-cases/errors/generic-invite-error'

export async function deleteInviteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteInviteParamsSchema = z.object({
      trainId: z.string(),
    })

    const { trainId } = deleteInviteParamsSchema.parse(request.params)

    const inviteRepository = new InviteRepository()
    const deleteInviteUseCase = new DeleteInviteUseCase(inviteRepository)

    await deleteInviteUseCase.execute(trainId)

    return reply.status(201).send({ message: 'Convite deletada com sucesso' })
  } catch (error) {
    if (error instanceof GenericInviteError) {
      return reply.status(400).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
