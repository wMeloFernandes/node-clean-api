import { ServerError } from '@/presentation/errors/server-error'
import { HttpReponse } from '@/presentation/protocols/http'

export const created = (data: any): HttpReponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpReponse => ({
  statusCode: 500,
  body: new ServerError()
})
