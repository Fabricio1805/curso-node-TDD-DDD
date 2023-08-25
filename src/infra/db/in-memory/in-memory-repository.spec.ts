import { InMemoryAccountRepository } from './InMemoryAccountRepository';
describe('Account in memory Repository', () => {
  const makuSut = (): InMemoryAccountRepository => {
    return new InMemoryAccountRepository();
  };
  test('Should return an account on success', async () => {
    const sut = makuSut();
    const account = await sut.add({
      name: 'johnDoe',
      email: 'johnDoe@test.com',
      password: '1234',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('johnDoe');
    expect(account.email).toBe('johnDoe@test.com');
    expect(account.password).toBe('1234');
  });
});
