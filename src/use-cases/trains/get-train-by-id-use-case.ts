import { TrainsRepositoryContract } from '@/repositories/contracts/trains-repository-contract'
import { ResourceNotFound } from '../errors/resource-not-found'

export class GetTrainByIdUseCase {
  constructor(private TrainsRepository: TrainsRepositoryContract) {}

  async execute(userId: string) {
    const train = await this.TrainsRepository.getTrainById(userId)

    if (!train) {
      throw new ResourceNotFound()
    }

    return { train }
  }
}
