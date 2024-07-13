import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user";

export async function userRoutes ( app : FastifyInstance) {
  app.post('/user',createUserController)
}