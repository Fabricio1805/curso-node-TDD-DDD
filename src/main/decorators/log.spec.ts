import { ILogErrorRepository } from '../../data/protocols/log-error-repository';
import { AccountModel } from '../../domain/models/account';
import { serverError, created } from '../../presentation/helpers/http-helper';
import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'johnDoe',
    email: 'johnDoe@test.com',
    password: '1234',
    passwordConfirmation: '1234',
  },
});

const makeFakeAccount = (): AccountModel => ({
  id: '756f632a-e1ba-4091-910a-fc7d59eb483f',
  name: 'johnDoe',
  email: 'johnDoe@test.com',
  password: '1234',
});

const makeServerError = () : IHttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: IController;
  logErrorRepositoryStub: ILogErrorRepository;
}
const makeController = (): IController => {
  class ControllerStub implements IController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      
      return new Promise((resolve) => resolve(created(makeFakeAccount())));
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async log(stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new LogErrorRepositoryStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');  
    await sut.handle(makeFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
  });


  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(created(makeFakeAccount()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(makeServerError())));
    await sut.handle(makeFakeRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
