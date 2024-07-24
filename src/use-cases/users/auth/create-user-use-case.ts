import { UsersRepositoryContract } from '@/repositories/contracts/users-repository-contract'

import bcriptjs from 'bcryptjs'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'

export interface createUserUseCaseRequest {
  username: string
  password: string
  email: string
  full_name: string
  phone_number: string
}

export class CreateUserUseCase {
  constructor(private UserRepository: UsersRepositoryContract) {}

  async execute({
    email,
    full_name,
    password,
    phone_number,
    username,
  }: createUserUseCaseRequest) {
    const passwordHashed = await bcriptjs.hash(password, 6)

    const userWithSameEmail = await this.UserRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.UserRepository.create({
      email,
      full_name,
      password: passwordHashed,
      phone_number,
      username,
    })

    return { user }
  }
}
