import { UsersRepository } from "@/repositories/users-repository";
import { createUserUseCase } from "@/use-cases/users/create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUserUseCaseRequest } from '@/use-cases/users/create-user-use-case'
import { z } from "zod";


const createBodySchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
  full_name: z.string(),
  phone_number: z.string(),
  role: z.enum(["ALUNO", "TREINADOR"]),
})

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  try {

    const {email,full_name,password,phone_number,role,username} = createBodySchema.parse(request.body)
    const userRepository = new UsersRepository()
    const userUseCase = new createUserUseCase(userRepository)
    
    await userUseCase.execute( {email,full_name,password,phone_number,role,username} )

  } catch (error) {
    console.log(error)
  }
}