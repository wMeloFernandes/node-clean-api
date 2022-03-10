import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '@/infra/cryptography/bcryt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encryptAdapter = new BCryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encryptAdapter, addAccountRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
