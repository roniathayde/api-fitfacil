import { Invite } from '@prisma/client'

export interface InviteRepositoryContract {
  createInvite(trainId: string, userId: string): Promise<Invite | null>

  deleteInvite(inviteId: string): Promise<Invite | null>
}
