import { TrainsRepositoryContract } from '@/repositories/contracts/trains-repository-contract'
import { Difficulty } from '@prisma/client'

export interface createTrainUseCaseRequest {
  title: string
  description: string
  scheduled_to: string
  duration_in_sec: string
  difficulty: Difficulty
}

export class CreateTrainUseCase {
  constructor(private TrainsRepository: TrainsRepositoryContract) {}

  async execute(
    {
      title,
      description,
      scheduled_to,
      duration_in_sec,
      difficulty,
    }: createTrainUseCaseRequest,
    userId: string,
  ) {
    const train = await this.TrainsRepository.createTrain(
      {
        title,
        description,
        scheduled_to,
        duration_in_sec,
        difficulty,
      },
      userId,
    )

    return { train }
  }
}
