import { TrainsRepositoryContract } from '@/repositories/contracts/trains-repository-contract'
import { ResourceNotFound } from '../errors/resource-not-found'

export class DeleteTrainUseCase {
  constructor(private TrainsRepository: TrainsRepositoryContract) {}

  async execute(trainId: string) {
    const train = await this.TrainsRepository.getTrainById(trainId)

    if (!train) {
      throw new ResourceNotFound()
    }

    await this.TrainsRepository.deleteTrain(trainId)

    return { train }
  }
}
