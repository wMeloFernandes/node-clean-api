import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpReponse, HttpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpReponse {
    ['email', 'email'].forEach(field => {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    })
  }
}
