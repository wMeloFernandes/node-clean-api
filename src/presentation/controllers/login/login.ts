import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, created, internalServerError } from '@/presentation/helpers/http-helper'
import { Controller, EmailValidator, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
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
      return created({})
    } catch (e) {
      return await new Promise((resolve, reject) => resolve(internalServerError()))
    }
  }
}
