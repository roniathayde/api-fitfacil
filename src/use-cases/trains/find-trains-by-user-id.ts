import { TrainsRepositoryContract } from '@/repositories/contracts/trains-repository-contract'

export class FindTrainsByUserIdUseCase {
  constructor(private TrainsRepository: TrainsRepositoryContract) {}

  async execute(userId: string) {
    const trains = await this.TrainsRepository.findTrainsByUserId(userId)

    return { trains }
  }
}
