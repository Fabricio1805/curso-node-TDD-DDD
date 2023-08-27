import { SignUpController } from '../../presentation/controllers/signup/SignUpController';
import { EmailValidatorAdapter } from '../../utils/email-validator';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repositoryt/account';


export const makeSignUpController = (): SignUpController => {
  const salt = 10;
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository);

  const emailValidator = new EmailValidatorAdapter();
  return new SignUpController(emailValidator, dbAddAccount);
};