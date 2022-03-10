import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ? process.env.MONGO_URL : '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
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
