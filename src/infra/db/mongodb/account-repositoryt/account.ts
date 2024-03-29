import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';


export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const result = (await accountCollection.insertOne(accountData)).insertedId;
   
    const account = await accountCollection.findOne({ _id: result });
    
    const accountWithId: AccountModel = {
      id:       account._id.toHexString(),
      name:     account.name,
      email:    account.email,
      password: account.password
    }; 
    
    return accountWithId;
  }
}
