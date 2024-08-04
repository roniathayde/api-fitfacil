import { InviteRepositoryContract } from '@/repositories/contracts/invite-repository-contract'
import { GenericInviteError } from '../errors/generic-invite-error'

export class DeleteInviteUseCase {
  constructor(private InviteRepository: InviteRepositoryContract) {}

  async execute(inviteId: string) {
    if (!inviteId) {
      throw new GenericInviteError()
    }

    const invite = await this.InviteRepository.deleteInvite(inviteId)

    if (!invite) {
      throw new GenericInviteError()
    }

    return { invite }
  }
}
