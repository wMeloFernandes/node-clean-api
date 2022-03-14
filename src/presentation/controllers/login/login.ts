import { Authentication } from '@/domain/usecases/authentication'
import { badRequest, internalServerError, ok, unauthorized } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validators/validation'
import { Controller, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validator: Validation
  constructor (authentication: Authentication, validator: Validation) {
    this.authentication = authentication
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const token = await this.authentication.auth(email, password)
      if (!token) {
        return unauthorized()
      }
      return ok({ token: 'any_token' })
    } catch (e) {
      return internalServerError()
    }
  }
}
