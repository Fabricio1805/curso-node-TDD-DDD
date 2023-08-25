import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('1234'));
  }
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {

    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('1234');

    expect(hashSpy).toHaveBeenCalledWith('1234', salt);
  });

  test('Should return a hash on sucess', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('1234');

    expect(hash).toBe('1234');
  });
  
});
