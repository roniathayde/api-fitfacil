import { UsersRepositoryContract } from '@/repositories/contracts/users-repository-contract'
import bcriptjs from 'bcryptjs'
import { User } from '@prisma/client'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

export interface signInUserUseCaseRequest {
  email: string
  password: string
}

export interface signInUserUseCaseResponse {
  user: User
}

export class SignInUserUseCase {
  constructor(private UserRepository: UsersRepositoryContract) {}

  async execute({ email, password }: signInUserUseCaseRequest) {
    const user = await this.UserRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFound()
    }

    if (!bcriptjs.compareSync(password, user.password)) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}
