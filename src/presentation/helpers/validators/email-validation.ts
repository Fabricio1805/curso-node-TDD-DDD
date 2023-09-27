import { InvalidParamError } from '../../errors';
import { IEmailValidator } from '../../protocols/email-validator';
import { Validation } from './validation';

export class EmailValdation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(input: any): Error {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName);
    }
  }
}