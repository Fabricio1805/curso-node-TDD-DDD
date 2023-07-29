import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  AddAccount,
  IEmailValidator,
} from './signup-protocols';

export class SignUpController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount; 
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
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.addAccount.add({
        name,
        email,
        password
      });

      return {
        statusCode: 201,
        body: account
      };
    } catch (error) {
      //console.error(error);
      return serverError();
    }
  }
}