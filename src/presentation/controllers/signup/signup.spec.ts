import { SignUpController } from './SignUpController';
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  IHttpRequest,
  Validation,
} from './signup-protocols';
import { MissingParamError, ServerError } from '../../errors';
import { created,badRequest, serverError } from '../../helpers/http-helper';

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: '756f632a-e1ba-4091-910a-fc7d59eb483f',
  name: 'johnDoe',
  email: 'johnDoe@test.com',
  password: '1234',
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};


const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'johnDoe',
    email: 'johnDoe@test.com',
    password: '1234',
    passwordConfirmation: '1234',
  },
});
interface ISutTypes {
  sut: SignUpController;
  addAccountStub: AddAccount;
  validationStub: Validation;
}

const makeSut = (): ISutTypes => {
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new SignUpController(
    addAccountStub,
    validationStub
  );
  return {
    sut,
    addAccountStub,
    validationStub,
  };
};
describe('SigUp Controller', () => {

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, 'add');

    sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    });
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(created(makeFakeAccount()));
  });

  test('Should call Validation with correct values', () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });
});