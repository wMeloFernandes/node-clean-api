import { Encrypter } from '../../data/usecases/add-account/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
