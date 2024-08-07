import { UserTrainsRepositoryContract } from '@/repositories/contracts/user-trains-repository-contract'
import { TrainRelationshipNotFound } from '../errors/train-relationship-not-found'

import { Role } from '@prisma/client'
import { TrainPermissionDenied } from '../errors/train-permission-denied'

export class FindUserRoleInTrain {
  constructor(private UserTrainsRepository: UserTrainsRepositoryContract) {}

  async execute(roleExpected: Role, userId: string, trainId: string) {
    const userTrain = await this.UserTrainsRepository.findRoleInTrain(
      userId,
      trainId,
    )

    if (!userTrain) {
      throw new TrainRelationshipNotFound()
    }

    if (roleExpected === 'TREINADOR' && userTrain.role !== roleExpected) {
      throw new TrainPermissionDenied()
    }

    return { userTrain }
  }
}
