import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ? process.env.MONGO_URL : '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  test('Should return an account on sucess', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'name',
      email: 'email',
      password: 'password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('name')
    expect(account.email).toBe('email')
    expect(account.password).toBe('password')
  })
})
