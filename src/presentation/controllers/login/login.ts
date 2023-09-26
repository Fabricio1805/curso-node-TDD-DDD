import { IAuthentication } from '../../../domain/usecases/authentication';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';
import { IEmailValidator } from '../signup/signup-protocols';

export class LoginController implements IController {
  constructor(private readonly emailValidator: IEmailValidator, private readonly authentication: IAuthentication ) { }
  
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {  
      const requiredFields = [
        'email',
        'password'
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const acessToken = await this.authentication.auth(email, password);

      if (!acessToken) {
        return unauthorized();
      }
    } catch (error) {
      return serverError(error);
    }
  }
}