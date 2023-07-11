import { MissingParamError } from '../errors/missing-param-error';
import { badRequest, serverError } from '../helpers/http-helper';
import { IController } from '../protocols/controller';
import { IEmailValidator } from '../protocols/email-validator';
import { IHttpRequest, IHttpResponse} from '../protocols/http';
import { InvalidParamError } from '../errors/invalid-param-error';
export class SignUpController implements IController {

  constructor(private readonly emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}