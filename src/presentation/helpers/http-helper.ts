import { HttpReponse } from '../protocols/http'

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (error: Error): HttpReponse => ({
  statusCode: 500,
  body: error
})
