import { Authentication } from '@/domain/usecases/authentication'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, internalServerError, ok, unauthorized } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validators/validation'
import { HttpRequest } from '@/presentation/protocols'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise<string>((resolve, reject) => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'email@mail.com',
      password: 'password'
    }
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const auhtSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(auhtSpy).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => resolve('')))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error(''))))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(internalServerError())
  })

  test('Should return 200 valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ token: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalid@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any'))
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any')))
  })
})
