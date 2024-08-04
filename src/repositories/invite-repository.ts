import { InviteRepositoryContract } from './contracts/invite-repository-contract'
import { prisma } from '@/lib/prisma'

export class InviteRepository implements InviteRepositoryContract {
  async createInvite(trainId: string, userId: string) {
    const invite = await prisma.invite.create({
      data: {
        created_at: new Date(), // Certifique-se de que isso é um Date object e não um string
        train: {
          connect: {
            id: trainId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return invite
  }

  async deleteInvite(inviteId: string) {
    const invite = await prisma.invite.delete({
      where: {
        id: inviteId,
      },
    })

    return invite
  }
}
