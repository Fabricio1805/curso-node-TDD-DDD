import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements IController  {
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
        return new Promise(resolve => resolve(httpResponse));
      }
      
    }
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
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
});
