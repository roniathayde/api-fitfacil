import { Prisma, User } from "@prisma/client";




export interface UsersRepositoryContract {
  create(data: Prisma.UserCreateInput): Promise<User>
}