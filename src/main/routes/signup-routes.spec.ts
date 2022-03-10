import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account successfully', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      })
      .expect(200)
  })
})
