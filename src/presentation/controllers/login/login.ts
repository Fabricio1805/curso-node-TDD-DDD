import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IAuthentication,
  IEmailValidator,
} from './login-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper';

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

      return ok({
        acessToken
      });
    } catch (error) {
      return serverError(error);
    }
  }
}