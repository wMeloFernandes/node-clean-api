import { MissingParamError, InvalidParamError, ServerError } from '../errors/'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpReponse, HttpRequest } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  handle (httpRequest: HttpRequest): HttpReponse {
    try {
      const { email, password, passwordConfirmation } = httpRequest.body
      const fields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        statusCode: 200,
        body: null
      }
    } catch (err) {
      return internalServerError()
    }
  }
}
