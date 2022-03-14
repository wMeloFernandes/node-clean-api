import { AddAccount } from '@/domain/usecases/add-account'
import { Controller, HttpRequest, HttpReponse } from '@/presentation/protocols'
import { badRequest, created, internalServerError } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validators/validation'

export class SignUpController implements Controller {
  private readonly addAcount: AddAccount
  private readonly validator: Validation

  constructor (addAcount: AddAccount, validator: Validation) {
    this.addAcount = addAcount
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpReponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
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
