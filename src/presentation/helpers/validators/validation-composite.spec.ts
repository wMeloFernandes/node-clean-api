import { MissingParamError } from '@/presentation/errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (): ValidationComposite => {
  const validationStub = new ValidationStub()
  return new ValidationComposite([validationStub])
}
class ValidationStub implements Validation {
  validate (input: any): Error | null {
    return new MissingParamError('field')
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
