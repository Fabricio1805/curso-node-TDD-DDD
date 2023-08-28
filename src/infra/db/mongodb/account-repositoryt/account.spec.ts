import {MongoHelper} from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';
describe('Account Mongo Repository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  
  const makuSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
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