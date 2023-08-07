import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from '../add-account/db-add-account';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub 
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234'
    };
    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('1234');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve,reject ) => reject(new Error())));
    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    };
    const promise = sut.add(accountData);

    expect(promise).rejects.toThrow();
  });
});
