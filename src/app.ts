import { fastify } from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { env } from 'process'
import { ZodError } from 'zod'
import { fastifyCookie } from '@fastify/cookie'
import { trainRoutes } from './http/controllers/trains/routes'

export const app = fastify()

app.register(fastifyCookie)

app.register(userRoutes)
app.register(trainRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // here we should log to an external tool like datadog/newrelic/sentry.
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
