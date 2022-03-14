import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '@/infra/cryptography/bcryt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const encryptAdapter = new BCryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encryptAdapter, addAccountRepository)
  const validator = makeSignUpValidation()
  return new SignUpController(dbAddAccount, validator)
}
