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
      const fields = ['email', 'password']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authentication.auth(email, password)
      return created({})
    } catch (e) {
      return internalServerError()
    }
  }
}
