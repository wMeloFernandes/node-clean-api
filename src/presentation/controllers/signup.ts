import { MissingParamError, InvalidParamError, ServerError } from '../errors/'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpReponse, HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  handle (httpRequest: HttpRequest): HttpReponse {
    try {
      const fields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      throw new ServerError()
    } catch (err) {
      return internalServerError()
    }
  }
}
