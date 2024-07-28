import { prisma } from '@/lib/prisma'
import { UserTrainsRepositoryContract } from './contracts/user-trains-repository-contract'

export class UserTrainsRepository implements UserTrainsRepositoryContract {
  async findRoleInTrain(userId: string, trainId: string) {
    const userTrains = await prisma.userTrains.findFirst({
      where: {
        AND: [
          {
            userId,
          },
          {
            trainsId: trainId,
          },
        ],
      },
    })

    return userTrains
  }
}
