import { AddAccount } from '@/domain/usecases/add-account'
import { Controller, EmailValidator, HttpRequest, HttpReponse } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors/'
import { badRequest, created, internalServerError } from '@/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAcount: AddAccount

  constructor (emailValidator: EmailValidator, addAcount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAcount = addAcount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
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
      const account = await this.addAcount.add({
        name,
        email,
        password
      })

      return created(account)
    } catch (err) {
      return internalServerError()
    }
  }
}
