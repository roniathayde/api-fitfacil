import { Prisma } from '@prisma/client'
import { UsersRepositoryContract } from './contracts/users-repository-contract'
import { prisma } from '@/lib/prisma'

export class UsersRepository implements UsersRepositoryContract {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
