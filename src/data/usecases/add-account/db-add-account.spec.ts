import { DbAddAccount } from '../add-account/db-add-account';
import { AddAccountRepository, AddAccountModel, AccountModel, Encrypter, } from './db-add-account-protocols';


const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'b3c77ee3-7b47-457e-8208-6835b2d9515a',
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: 'hashed_password',
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }

  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository(); 
  
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
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

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    };
    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: 'hashed_password',
    });
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    };
    const promise = sut.add(accountData);

    expect(promise).rejects.toThrow();
  });

  test('Should return an account on sucess', async () => {
    const { sut } = makeSut();

    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    };
    const account = await sut.add(accountData);

    expect(account).toEqual({
      id: 'b3c77ee3-7b47-457e-8208-6835b2d9515a',
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: 'hashed_password',
    });
  });
});
