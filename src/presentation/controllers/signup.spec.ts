import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password',
        password_confirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statudCode).toBe(400)
  })
})