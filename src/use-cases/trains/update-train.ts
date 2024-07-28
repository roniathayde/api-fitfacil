import { TrainsRepositoryContract } from '@/repositories/contracts/trains-repository-contract'
import { ResourceNotFound } from '../errors/resource-not-found'
import { Prisma } from '@prisma/client'

export class UpdateTrainUseCase {
  constructor(private TrainsRepository: TrainsRepositoryContract) {}
  async execute(data: Prisma.TrainsUpdateInput, trainId: string) {
    const train = await this.TrainsRepository.updateTrain(data, trainId)

    if (!train) {
      throw new ResourceNotFound()
    }

    return { train }
  }
}
