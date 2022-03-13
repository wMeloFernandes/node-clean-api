import { MissingParamError } from '@/presentation/errors'
import { badRequest, created } from '@/presentation/helpers/http-helper'
import { Controller, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!password) {
      return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('password'))))
    }
    return created({})
  }
}
