import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpReponse, HttpRequest } from '@/presentation/protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    return await new Promise((resolve, reject) => resolve(badRequest(new MissingParamError('email'))))
  }
}
