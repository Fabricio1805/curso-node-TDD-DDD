import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub: IController
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse: IHttpResponse = {
        statusCode: 200,
        body: {
          name: 'johnDoe',
          email: 'johnDoe@test.com',
          password: '1234',
          passwordConfirmation: '1234',
        },
      };
      return new Promise((resolve) => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

const makeSut = (): SutTypes => {

  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    sut,
    controllerStub
  };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };
    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });


  test('Should return the same result of the controller', async () => {
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

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'johnDoe',
        email: 'johnDoe@test.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    });
  });
});
