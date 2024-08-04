import { InviteRepositoryContract } from '@/repositories/contracts/invite-repository-contract'
import { GenericInviteError } from '../errors/generic-invite-error'
import dayjs from 'dayjs'
import { InviteExpiredError } from '../errors/invite-expired'

export class CreateInviteUseCase {
  constructor(private InviteRepository: InviteRepositoryContract) {}

  async execute(trainId: string, userId: string) {
    if (!trainId) {
      throw new GenericInviteError()
    }

    if (!userId) {
      throw new GenericInviteError()
    }

    const invite = await this.InviteRepository.createInvite(trainId, userId)

    if (!invite) {
      throw new GenericInviteError()
    }

    // Verificar se o convite expirou (7 dias após a criação)
    const expirationDate = dayjs(invite.created_at).add(7, 'days')
    const now = dayjs()

    if (now.isSame(expirationDate) || now.isAfter(expirationDate)) {
      // Se o convite expirou, delete-o ou marque-o como não aceitável
      await this.InviteRepository.deleteInvite(invite.id)
      throw new InviteExpiredError()
    }

    return { invite }
  }
}
