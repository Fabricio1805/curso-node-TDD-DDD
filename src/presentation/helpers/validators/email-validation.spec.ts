import { IEmailValidator } from '../../controllers/signup/signup-protocols';
import { InvalidParamError } from '../../errors';
import { EmailValdation } from './email-validation';

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
  
};

interface ISutTypes {
  sut: EmailValdation;
  emailValidatorStub: IEmailValidator;
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValdation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub
  };
};
describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate(
      {
        email: 'johnDoe@test.com',
      }
    );

    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    
    sut.validate({
      email: 'johnDoe@test.com',
    });
    expect(isValidSpy).toHaveBeenCalledWith('johnDoe@test.com');
  });

  test('Should throw if EmailValidator throws', async () => {
    
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});