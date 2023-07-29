import { SignUpController } from './SignUpController';
import {
  AddAccount,
  AddAccountModel,
  IEmailValidator,
  AccountModel,
} from './signup-protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';


const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
  
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: '756f632a-e1ba-4091-910a-fc7d59eb483f',
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
      };
      return new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};


interface ISutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
  addAccountStub: AddAccount
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  };
};
describe('SigUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
  
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'johnDoe',
        password: '1234',
        passwordConfirmation: '1234',
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
  
  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        passwordConfirmation: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no password confirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    );
  });

  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '12245',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    );
  });

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('email')
    );
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('johnDoe@test.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
    
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, 'add');

    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    });
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      id: '756f632a-e1ba-4091-910a-fc7d59eb483f',
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    });
  });
});