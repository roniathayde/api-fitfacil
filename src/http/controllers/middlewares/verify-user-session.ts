import { env } from '@/env'
import { UserNotAuthenticated } from '@/use-cases/errors/user-not-authenticated'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const DATE_NOW = dayjs()
    const CURRENT_DATE_PLUS_7_DAYS = DATE_NOW.add(7, 'day')
    const { auth } = request.cookies
    if (!auth) {
      throw new UserNotAuthenticated()
    }

    // Verificação do JWT
    jwt.verify(auth, env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          // Se o JWT expirou, mas o cookie ainda é presente, podemos gerar um novo JWT

          // Decodifique o payload do token sem verificar a validade
          const payload = jwt.decode(auth) as jwt.JwtPayload

          const newJwtToken = jwt.sign(
            {
              id: payload.id,
              role: payload.role,
            },
            env.JWT_SECRET_KEY,
            {
              expiresIn: '10m', // Novo JWT expira em 10 minutos
            },
          )

          // Atualiza o cookie com o novo JWT
          reply.setCookie('auth', newJwtToken, {
            path: '/',
            httpOnly: true,
            expires: CURRENT_DATE_PLUS_7_DAYS.toDate(), // 7 dias
          })

          request.user = payload // Use o payload decodificado
          return
        }

        // Se o erro não for de expiração, o JWT é inválido
        throw new UserNotAuthenticated()
      }

      // Se o JWT é válido, armazena o usuário na requisição
      if (decoded) {
        request.user = decoded
      }
    })
  } catch (error) {
    if (error instanceof UserNotAuthenticated) {
      return reply
        .status(UserNotAuthenticated.statusCode)
        .send({ message: error.message })
    }

    throw error
  }
}
