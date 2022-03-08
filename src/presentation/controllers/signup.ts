import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpReponse, HttpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpReponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    return badRequest(new MissingParamError('email'))
  }
}
