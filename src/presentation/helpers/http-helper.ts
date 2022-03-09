import { AccountModel } from '../../domain/models/account'
import { ServerError } from '../errors/server-error'
import { HttpReponse } from '../protocols/http'

export const created = (account: AccountModel): HttpReponse => ({
  statusCode: 201,
  body: account
})

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpReponse => ({
  statusCode: 500,
  body: new ServerError()
})
