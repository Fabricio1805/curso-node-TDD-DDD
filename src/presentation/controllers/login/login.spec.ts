import { LoginController } from './login';
import { badRequest, serverError } from '../../helpers/http-helper';
import {  InvalidParamError, MissingParamError } from '../../errors';
import { IEmailValidator, IHttpRequest, IHttpResponse } from '../signup/signup-protocols';
import { IAuthentication } from '../../../domain/usecases/authentication';

interface SutTypes {
  sut: LoginController;
  emailValidatorStub: IEmailValidator;
  authenticationStub: IAuthentication;
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAuthentication = (): IAuthentication => {
  class AutheticationStub implements IAuthentication {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async auth(email: string, password: string): Promise<string> {
      return 'token';
    }
  }
  return new AutheticationStub();
};

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication();
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub, authenticationStub);
  return {
    sut,
    emailValidatorStub,
    authenticationStub,
  };
};

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'test@example.com',
    password: '1234'
  }
});


describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: '1234',
      },
    };
    const httpResponse: IHttpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'test@example.com'
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    await sut.handle(makeFakeRequest());

    expect(isValidSpy).toHaveBeenCalledWith('test@example.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call Authetication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(makeFakeRequest());

    expect(authSpy).toHaveBeenCalledWith('test@example.com', '1234');
  });
});
