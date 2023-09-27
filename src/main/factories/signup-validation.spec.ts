import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation';
import { EmailValdation } from '../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { IEmailValidator } from '../../presentation/protocols/email-validator';
import { makeSignUpValidation } from './signup-validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValdation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});