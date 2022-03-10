import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcryt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve, reject) => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return hash successfully', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => await new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
