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
 
  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn<any, string>(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.encrypt('1234');
    await expect(promise).rejects.toThrow();
  });
});
