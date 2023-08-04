describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    class EncrypterStub {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('hased_password'));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    };
    sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('1234');
  });
});