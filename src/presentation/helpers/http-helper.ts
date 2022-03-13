import { ServerError } from '@/presentation/errors/server-error'
import { HttpReponse } from '@/presentation/protocols/http'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const created = (data: any): HttpReponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpReponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const internalServerError = (): HttpReponse => ({
  statusCode: 500,
  body: new ServerError()
})
