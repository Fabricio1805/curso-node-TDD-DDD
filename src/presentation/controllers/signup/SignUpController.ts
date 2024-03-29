import { badRequest, created, serverError } from '../../helpers/http-helper';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  AddAccount,
  Validation,
} from './signup-protocols';

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return created(account);
    } catch (error) {
      return serverError(error);
    }
  }
}