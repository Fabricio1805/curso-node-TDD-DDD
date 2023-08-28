import { SignUpController } from '../../presentation/controllers/signup/SignUpController';
import { EmailValidatorAdapter } from '../../utils/email-validator';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repositoryt/account';
import { IController } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import { LogMongoRepository } from '../../infra/db/mongodb/log/log';


export const makeSignUpController = (): IController => {
  const salt = 10;
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository);

  const emailValidator = new EmailValidatorAdapter();
  const signUpController = new SignUpController(emailValidator, dbAddAccount);
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};