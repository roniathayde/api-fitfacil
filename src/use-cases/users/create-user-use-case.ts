import { UsersRepositoryContract } from '@/repositories/contracts/users-repository-contract'
import { Role } from '@prisma/client'

export interface createUserUseCaseRequest {
  username: string
  password: string
  email: string
  full_name: string
  phone_number: string
  role: Role
}

export class createUserUseCase {
  constructor(private createUserRepository: UsersRepositoryContract) {}

  async execute({
    email,
    full_name,
    password,
    phone_number,
    role,
    username,
  }: createUserUseCaseRequest) {
    const user = await this.createUserRepository.create({
      email,
      full_name,
      password,
      phone_number,
      role,
      username,
    })

    return { user }
  }
}
