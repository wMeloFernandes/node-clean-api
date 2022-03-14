import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ not: 'not_any_fields' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'field' })
    expect(error).toBeFalsy()
  })
})
