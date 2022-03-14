import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field', fieldToCompare: 'not_field' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field', fieldToCompare: 'field' })
    expect(error).toBeFalsy()
  })
})
