import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcryt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve, reject) => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return hash successfully', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    // const hashSpy = jest.spyOn(bcrypt, 'hash')
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
