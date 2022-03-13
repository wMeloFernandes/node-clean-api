import { Authentication } from '@/domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, created, internalServerError } from '@/presentation/helpers/http-helper'
import { Controller, EmailValidator, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return await new Promise((resolve, reject) => resolve(badRequest(new InvalidParamError('email'))))
      }
      const token = await this.authentication.auth(email, password)
      return created({})
    } catch (e) {
      return await new Promise((resolve, reject) => resolve(internalServerError()))
    }
  }
}
