import {MongoHelper} from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';
describe('Account Mongo Repository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository();
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