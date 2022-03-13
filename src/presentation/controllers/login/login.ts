import { MissingParamError } from '@/presentation/errors'
import { badRequest, created } from '@/presentation/helpers/http-helper'
import { Controller, EmailValidator, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!password) {
      return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('password'))))
    }
    this.emailValidator.isValid(email)
    return created({})
  }
}
