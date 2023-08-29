import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';
import { IEmailValidator } from '../signup/signup-protocols';

export class LoginController implements IController {
  constructor(private readonly emailValidator: IEmailValidator) { }
  
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body;
    if (!email) {
      return badRequest(new MissingParamError('email'));
    }

    if (!password) {
      return badRequest(new MissingParamError('password'));
    }

    const isValidEmail = this.emailValidator.isValid(email);
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'));
    }
  }
}